import { APISummary, Integration } from '@syndesis/models';
import * as React from 'react';
import { ApiContext } from './ApiContext';
import { callFetch } from './callFetch';

export function useApiProviderSummary(specification: string) {
  const apiContext = React.useContext(ApiContext);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<false | Error>(false);
  const [apiSummary, setApiSummary] = React.useState<APISummary | undefined>(
    undefined
  );

  React.useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const body = new FormData();
        body.append('specification', specification);
        const response = await callFetch({
          body,
          headers: apiContext.headers,
          includeAccept: true,
          includeContentType: false,
          method: 'POST',
          url: `${apiContext.apiUri}/apis/info`,
        });
        const summary = await response.json();
        if (summary.errorCode || summary.errors) {
          throw new Error(
            summary.userMsg ||
              (summary.errors || [])
                .map((e: any) => e.message)
                .filter((m: string) => m)
                .join('\n')
          );
        }
        setApiSummary(summary as APISummary);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [specification, apiContext, setLoading, setApiSummary, setError]);

  return { apiSummary, loading, error };
}

export function useApiProviderIntegration() {
  const apiContext = React.useContext(ApiContext);

  const getIntegration = async (specification: string) => {
    const body = new FormData();
    body.append('specification', specification);
    const response = await callFetch({
      body,
      headers: apiContext.headers,
      includeAccept: true,
      includeContentType: false,
      method: 'POST',
      url: `${apiContext.apiUri}/apis/generator`,
    });
    const integration = await response.json();
    if (integration.errorCode) {
      throw new Error(integration.userMsg);
    }
    return integration;
  };

  return getIntegration;
}

export function useApiProviderSpecification(
  specificationOrIntegration: string | Integration
) {
  const apiContext = React.useContext(ApiContext);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<false | Error>(false);
  const [specification, setSpecification] = React.useState<string | undefined>(
    undefined
  );

  React.useEffect(() => {
    const fetchSpecification = async () => {
      setLoading(true);
      try {
        const response = await callFetch({
          headers: apiContext.headers,
          method: 'GET',
          url: `${apiContext.apiUri}/integrations/${
            (specificationOrIntegration as Integration).id
          }/specification`,
        });
        const integrationSpecification = await response.json();
        if (integrationSpecification.errorCode) {
          throw new Error(integrationSpecification.userMsg);
        }
        setSpecification(JSON.stringify(integrationSpecification));
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };
    if (typeof specificationOrIntegration === 'string') {
      setSpecification(specificationOrIntegration);
    } else {
      fetchSpecification();
    }
  }, [specificationOrIntegration, apiContext, setLoading]);

  return { specification, loading, error };
}
