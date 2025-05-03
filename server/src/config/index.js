import { yup, validateYupSchema } from '@strapi/utils';

// Define the schema for plugin configuration validation
const pluginConfigSchema = yup.object().shape({
  // Array of download buttons with each button having a label and endpoints
  downloadButtons: yup.array().of(
    yup.object().shape({
      label: yup.string().required(), // Label must be a non-empty string
      endpoints: yup.object().shape({
        localhost: yup
          .string()
          .matches(/^https?:\/\/.+/, 'Must be a valid URL for localhost') // URL format validation for localhost
          .required(), // localhost URL is required
        production: yup
          .string()
          .matches(/^https?:\/\/.+/, 'Must be a valid URL for production') // URL format validation for production
          .required(), // production URL is required
      }).required(),
    })
  ),
  // Optional boolean setting for custom feature
  someSetting: yup.boolean().default(false),
  
  // Secret key for secure operations, ideally sourced from environment variables
  secretKey: yup.string().default(process.env.SECRET_KEY || ''), // Default from env variable if available
});

// Default configuration for the plugin
export default {
  default: {
    title: '',
    downloadButtons: [], // Default is an empty array for download buttons
    someSetting: false,   // Default setting is false
    secretKey: process.env.SECRET_KEY || '', // Set secret key from environment variable or default to empty string
  },

  // Validator function to validate the plugin config
  validator(config) {
    try {
      validateYupSchema(pluginConfigSchema)(config);
    } catch (error) {
      throw new Error(`Plugin configuration validation failed: ${error.message}`);
    }
  },
};
