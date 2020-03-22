import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QuerySnapshot, DocumentSnapshot, Timestamp } from '@firebase/firestore-types';
import moment from 'moment';

// utils
import * as FirestoreService from '../service/firestore';
import { LinkItem } from '../types';

const ShortenUrlRecord = () => {
  const [linkList, setLinkList] = useState<LinkItem[]>([]);

  useEffect(() => {
    // Use an effect hook to subscribe to the link list item stream and
    // automatically unsubscribe when the component unmounts.
    const unsubscribe = FirestoreService.streamShortLinkList({
      next: (querySnapshot: QuerySnapshot) => {
        const updatedLinkList: LinkItem[] = querySnapshot.docs.map(
          (doc: DocumentSnapshot) =>
            ({
              id: doc.id,
              ...doc.data()
            } as LinkItem)
        );
        setLinkList(updatedLinkList);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Container>
      {linkList.map((link: LinkItem, index: number) => {
        const timestamp = link.createdAt as Timestamp;
        const date = moment(timestamp.seconds * 1000)
          .format('DD MMM')
          .toLocaleUpperCase();

        return (
          <Card key={`short-link-${index}`}>
            <div className="card-date">CREATED {date}</div>
            <div className="card-origin" title={link.origin}>
              {link.origin}
            </div>
            <div className="card-footer">
              <div className="card-footer__link">
                <a
                  href={`http://link.hherado.com/${link.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  link.hherado.com/<span>{link.id}</span>
                </a>
              </div>
              <div className="card-footer__click">
                <div className="title">Total Click</div>
                <div className="count">{link.count}</div>
              </div>
            </div>
          </Card>
        );
      })}
    </Container>
  );
};

export default ShortenUrlRecord;

const Container = styled.div`
  width: 500px;
  /* border: 1px solid black; */
`;

const Card = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 20px 24px;
  overflow: hidden;
  margin-bottom: 4px;

  .card-date {
    color: #828387;
    font-size: 11px;
    font-weight: 700;
    line-height: 15px;
    text-transform: capitalize;

    margin-bottom: 12px;
  }

  .card-origin {
    width: 100%;
    font-size: 14px;
    line-height: 19px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;

    margin-bottom: 12px;
  }

  .card-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__link {
      flex: 3;
      font-size: 11px;
      color: #ee6123;

      a {
        color: inherit;
      }

      span {
        font-weight: bold;
      }
    }

    &__click {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .title {
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 4px;
      }

      .count {
        font-weight: normal;
      }
    }
  }

  :last-child {
    margin-bottom: 20px;
  }
`;
