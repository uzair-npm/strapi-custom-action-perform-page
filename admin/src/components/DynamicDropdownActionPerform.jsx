import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@strapi/design-system';
import { SingleSelect, SingleSelectOption } from '@strapi/design-system';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  margin-top: 80px;
`;

const Card = styled.div`
  background: #212134;
  padding: 32px 48px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 24px;
`;

const Spacer = styled.div`
  height: 24px;
`;

const LoadingSpinner = styled.div`
  margin: 10px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  font-size: 16px;
  margin-top: 16px;
  text-align: center;
`;

const getEnvironmentKey = () => {
  return window.location.hostname === 'localhost' ? 'localhost' : 'production';
};

const DynamicDropdownActionPerform = () => {
  const [buttons, setButtons] = useState([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [title, setTitle] = useState('');

  useEffect(() => {
    setLoading(true); // Set loading to true when the fetch starts
    fetch('/api/strapi-custom-action-perform-page/config')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched title:', data); // Log to check the title
        setTitle(data.title); // Update the title in state
        setLoading(false);
        if (Array.isArray(data.downloadButtons)) {
          setButtons(data.downloadButtons);
        } else {
          setError('Failed to load data. Please try again later.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('An error occurred while fetching the data.');
        setLoading(false);
      });
  }, []);

  const handleDownload = () => {
    if (!selected) return;

    const envKey = getEnvironmentKey();
    const selectedOption = buttons.find((btn) => btn.label === selected);

    if (selectedOption && selectedOption.endpoints?.[envKey]) {
      window.location.href = selectedOption.endpoints[envKey];
    } else {
      setError('Selected option is invalid or no endpoint available.');
    }
  };

  return (
    <PageWrapper>
      <Card>
        <Title>{title ? title : 'Perform Action'}</Title>

        {/* Show loading spinner if data is still being fetched */}
        {loading && <LoadingSpinner>Loading...</LoadingSpinner>}

        {/* Show error message if something went wrong */}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {!loading && !error && (
          <>
            <SingleSelect
              label="Select Enquiry Type"
              placeholder="Choose an option"
              value={selected}
              onChange={setSelected}
            >
              {buttons.map((btn, index) => (
                <SingleSelectOption key={index} value={btn.label}>
                  {btn.label}
                </SingleSelectOption>
              ))}
            </SingleSelect>

            <Spacer />
            {selected && buttons.find((btn) => btn.label === selected)?.buttonText && (
              <Button onClick={handleDownload}>
                {buttons.find((btn) => btn.label === selected).buttonText}
              </Button>
            )}
          </>
        )}
      </Card>
    </PageWrapper>
  );
};

export default DynamicDropdownActionPerform;
