import { storiesOf } from '@storybook/react';
import * as React from 'react';
import {
  Container,
  EditorPageCard,
  TemplateStepTemplateEditor,
  TemplateStepTypeSelector,
  TemplateType,
} from '../../../../src';
import { ITextEditor } from '../../../../src/Shared';

const stories = storiesOf('Integration/Editor/step/TemplateStep', module);

stories.add('Normal', () => (
  <>
    <Container>
      <TemplateStepStory
        initialText={'Some words or something {{body}}'}
        initialTemplateType={TemplateType.Mustache}
      />
    </Container>
  </>
));

interface ITemplateStepStoryProps {
  initialText: string;
  initialTemplateType: string;
}

interface ITemplateStepStoryState {
  text: string;
  type: TemplateType;
}

class TemplateStepStory extends React.Component<
  ITemplateStepStoryProps,
  ITemplateStepStoryState
> {
  constructor(props: ITemplateStepStoryProps) {
    super(props);
    this.state = {
      text: this.props.initialText,
      type: this.props.initialTemplateType as TemplateType,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTemplateTypeChange = this.handleTemplateTypeChange.bind(this);
  }
  public handleChange(editor: ITextEditor, data: any, value: string) {
    this.setState({
      text: value,
    });
  }
  public handleTemplateTypeChange(type: TemplateType) {
    this.setState({
      type,
    });
  }
  public render() {
    return (
      <>
        <EditorPageCard
          i18nDone={'Done'}
          isValid={true}
          submitForm={() => {
            /* todo */
          }}
        >
          <TemplateStepTypeSelector
            i18nSpecifyTemplateType={'Specify template type:'}
            i18nFreemarkerLabel={'Freemarker'}
            i18nMustacheLabel={'Mustache'}
            i18nVelocityLabel={'Velocity'}
            templateType={this.state.type as TemplateType}
            onTemplateTypeChange={this.handleTemplateTypeChange}
          />
          <TemplateStepTemplateEditor
            mode={this.state.type as TemplateType}
            i18nFileUploadLimit={'Max: 1 file (up to 1MB)'}
            textEditorDescription={
              <p>
                Drag and drop a file, paste in text, or start typing in the text
                editor below to add a template. If you already have a template
                file, browse to upload the file.
              </p>
            }
            initialValue={this.state.text}
            onChange={this.handleChange}
          />
        </EditorPageCard>
      </>
    );
  }
}
