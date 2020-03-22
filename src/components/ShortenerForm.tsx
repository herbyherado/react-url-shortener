import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from '@firebase/app';

// utils
import * as FirestoreService from '../service/firestore';
import generateHash from '../utils/generateHash';
import validateHashID from '../utils/validateHashID';
import validateURL from '../utils/validateURL';

// types
import { LinkAttribute } from '../types';

type ErrorForm = {
  url: boolean;
  customHashID: boolean;
};

const ShortenerForm = () => {
  const [customHashID, setCustomHashID] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorForm, setErrorForm] = useState<ErrorForm>({ url: false, customHashID: false });

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleChangeCustomHashID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomHashID(e.target.value);
  };

  const validateFields = async (): Promise<boolean> => {
    const error = { ...errorForm };

    // ensure url is correct
    const urlSafeLink = validateURL(url);

    if (!urlSafeLink) {
      error.url = true;
      setErrorForm(error);
      setErrorMessage('Not a valid URL');
      return true;
    }

    if (customHashID) {
      // ensure hashID is a 'url safe' string
      const hashSafeLink = validateHashID(customHashID);
      // check if the custom backhalf already exist in db
      const uniqueHash = await FirestoreService.checkExistingDoc('link', customHashID);

      if (!uniqueHash || !hashSafeLink) {
        error.customHashID = true;
        setErrorForm(error);
        if (!uniqueHash) {
          setErrorMessage('Back-half already exists');
        } else if (!hashSafeLink) {
          setErrorMessage('Back-half is not a valid URL');
        }
        return true;
      }
    }

    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hashID = customHashID;
    const data: LinkAttribute = {
      origin: url,
      count: 0,
      createdAt: firebase.firestore?.FieldValue.serverTimestamp()!
    };
    const hasError = await validateFields();
    if (hasError) return;
    if (!customHashID) {
      hashID = generateHash();
    }
    try {
      // creates new data in DB
      FirestoreService.createShortLink(hashID, data);

      // reset states after successful update
      resetState();
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const resetState = () => {
    setCustomHashID('');
    setUrl('');
    setErrorMessage('');
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Field>
          <label>Custom Back-Half</label>
          <Input
            name="customHashID"
            value={customHashID}
            placeholder="(Optional) Custom Back-Half"
            isError={errorForm.customHashID}
            onChange={handleChangeCustomHashID}
          />
        </Field>
        <Field>
          <label>Long URL</label>
          <Input
            name="url"
            value={url}
            placeholder="https://example.com/document/some/very/long/path"
            isError={errorForm.url}
            onChange={handleChangeUrl}
          />
        </Field>
        <div className="form-text form-text__danger">{errorMessage}</div>
        <Button disabled={!url} onClick={handleSubmit}>
          Create
        </Button>
      </Form>
    </Container>
  );
};

export default ShortenerForm;

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Form = styled.form`
  min-width: 300px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  color: #535353;
  border-radius: 2px;

  .form-text {
    font-size: 12px;
    color: #535353;

    &__danger {
      text-align: center;
      color: red;
      padding: 5px 0 10px;

      ::before {
        content: '';
      }
    }
  }

  .form-title {
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: left;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 24px;

  label {
    font-size: 12px;
    align-self: flex-start;
    margin-bottom: 5px;
    font-weight: 700;
  }

  :last-child {
    margin-bottom: 30px;
  }
`;

const Input = styled.input<{ isError: boolean }>`
  height: 35px;
  padding: 0 10px;
  border: 0;
  border-bottom: 1px solid ${({ isError }) => (isError ? '#ff354a' : '#efeeed')};
  transition: 150ms all ease-in;
  font-size: 12px;
  color: #535353;

  ::placeholder {
    color: #cccccc;
  }

  :focus {
    border-bottom: 1px solid #a0a4a8;
    outline: none;
  }
`;

const Button = styled.button`
  align-self: center;
  width: 140px;
  height: 35px;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #fff;
  color: #000;
  outline: none;
  transition: 150ms background-color, box-shadow ease-in-out;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: none;

  :focus {
    border: 1px solid #ccc;
  }

  :hover {
    border: 1px solid #fff;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.05);
  }

  :disabled {
    cursor: auto;
    background-color: #ccc;
    border: 1px solid #ccc;
    color: #fff;
  }
`;
