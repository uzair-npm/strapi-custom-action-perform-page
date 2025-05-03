import { Main, Typography } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { PLUGIN_VERSION } from '../config'; // Import version from config.js
import styled from 'styled-components';
import DynamicDropdownActionPerform from '../components/DynamicDropdownActionPerform';

const FooterDiv = styled.div`
  background-color: #212134;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  margin-top: 300px; /* Reduced margin-top for better spacing */
  padding: 20px 40px;
  text-align: center; /* Center the footer text */
`;

const Anchor = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline; /* Added hover effect for better UX */
  }
`;

const VersionText = styled.div`
  margin-top: 15px;
  color: #fff;
  font-size: 14px;
`;

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main>
      <DynamicDropdownActionPerform />

      {/* Footer Section */}
      <FooterDiv>
        <Typography variant="pi" textColor="neutral600" style={{ marginTop: '40px' }}>
          By Uzair Sayyed{' '}
        </Typography>
        <Typography variant="pi" textColor="neutral600" style={{ marginTop: '10px' }}>
          &copy; {new Date().getFullYear()}{' '}
          <Anchor
            href="https://nipralo.com"
            target="_blank"
            aria-label="Visit Nipralo Technologies"
          >
            Nipralo Technologies
          </Anchor>{' '}
          All rights reserved.
        </Typography>

        {/* Displaying the plugin version */}
        <VersionText>
          <Typography variant="pi" textColor="neutral600">
            Version: {PLUGIN_VERSION}
          </Typography>
        </VersionText>
      </FooterDiv>
    </Main>
  );
};

export { HomePage };
