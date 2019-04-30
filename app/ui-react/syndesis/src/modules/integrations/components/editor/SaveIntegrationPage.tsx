import { setIntegrationName, WithIntegrationHelpers } from '@syndesis/api';
import { AutoForm, IFormDefinition } from '@syndesis/auto-form';
import { Integration } from '@syndesis/models';
import { IntegrationEditorForm, IntegrationEditorLayout } from '@syndesis/ui';
import { WithRouteData } from '@syndesis/utils';
import * as H from 'history';
import * as React from 'react';
import { PageTitle } from '../../../../shared';
import {
  ISaveIntegrationForm,
  ISaveIntegrationRouteParams,
  ISaveIntegrationRouteState,
} from './interfaces';

export interface ISaveIntegrationPageProps {
  backHref: (
    p: ISaveIntegrationRouteParams,
    s: ISaveIntegrationRouteState
  ) => H.LocationDescriptor;
  cancelHref: (
    p: ISaveIntegrationRouteParams,
    s: ISaveIntegrationRouteState
  ) => H.LocationDescriptor;
  header: React.ReactNode;
  postSaveHref: (i: Integration) => H.LocationDescriptorObject;
}

/**
 * This page asks for the details of the integration, and saves it.
 *
 * This component expects a [state]{@link ISaveIntegrationRouteState} to be
 * properly set in the route object.
 *
 * **Warning:** this component will throw an exception if the route state is
 * undefined.
 *
 * @todo toast notifications.
 * @todo redirect to the integration detail page once available.
 */
export class SaveIntegrationPage extends React.Component<
  ISaveIntegrationPageProps
> {
  public render() {
    return (
      <WithRouteData<ISaveIntegrationRouteParams, ISaveIntegrationRouteState>>
        {({ flowId }, { integration }, { history }) => (
          <WithIntegrationHelpers>
            {({ saveIntegration }) => {
              const onSave = async (
                { name, description }: ISaveIntegrationForm,
                actions: any
              ) => {
                const updatedIntegration = setIntegrationName(
                  integration,
                  name
                );
                // TODO: set the description
                await saveIntegration(updatedIntegration);
                actions.setSubmitting(false);
                // TODO: toast notification
                history.push(this.props.postSaveHref(updatedIntegration));
              };
              const definition: IFormDefinition = {
                name: {
                  defaultValue: '',
                  displayName: 'Name',
                  order: 0,
                  required: true,
                  type: 'string',
                },
                // tslint:disable-next-line
                description: {
                  defaultValue: '',
                  displayName: 'Description',
                  order: 1,
                  type: 'textarea',
                },
              };
              return (
                <AutoForm<ISaveIntegrationForm>
                  i18nRequiredProperty={'* Required field'}
                  definition={definition}
                  initialValue={{
                    description: integration.description,
                    name: integration.name,
                  }}
                  onSave={onSave}
                >
                  {({
                    fields,
                    dirty,
                    handleSubmit,
                    isSubmitting,
                    isValid,
                    submitForm,
                  }) => (
                    <IntegrationEditorLayout
                      header={this.props.header}
                      content={
                        <>
                          <PageTitle title={'Save the integration'} />
                          <IntegrationEditorForm
                            i18nTitle={'Save the integration'}
                            i18nSubtitle={
                              'Update details about this integration.'
                            }
                            handleSubmit={handleSubmit}
                          >
                            {fields}
                          </IntegrationEditorForm>
                        </>
                      }
                      cancelHref={this.props.cancelHref(
                        { flowId },
                        { integration }
                      )}
                      backHref={this.props.backHref(
                        { flowId },
                        { integration }
                      )}
                      onNext={submitForm}
                      isNextDisabled={dirty && !isValid}
                      isNextLoading={isSubmitting}
                      isLastStep={true}
                    />
                  )}
                </AutoForm>
              );
            }}
          </WithIntegrationHelpers>
        )}
      </WithRouteData>
    );
  }
}