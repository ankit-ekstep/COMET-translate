import React from 'react';
import { Modal, Label, Icon, Button, Dropdown } from 'semantic-ui-react';
import styles from './style.scss';

import { Styled } from 'direflow-component';

class TranslationVersionSelectModal extends React.Component {
    state = {
        selectedTranscribeAllIndex: null,
    }
    getVersionedSubslides = () => {
        const { slide, subslide, translationVersions } = this.props;
        if (!slide || !subslide || !translationVersions) return [];
        const slidePosition = slide.position;
        const subslidePosition = subslide.position;
        const subslides = [];
        translationVersions.forEach(article => {
            const vsubslide = article.slides.find(s => s.position === slidePosition).content.find(s => s.position === subslidePosition);
            vsubslide.articleId = article._id;
            subslides.push(vsubslide);
        });
        return subslides;
    }

    render() {
        const { open, onClose, subslide, versionedSubslides, onVersionChange, translationVersions } = this.props;
        if (!open) return null;
        return (
            <Modal
                size="tiny"
                open={open}
                onClose={onClose}
            >

                <Modal.Header>
                    <h4>
                        {(translationVersions || []).length} versions available
                        <Button
                            circular
                            basic
                            icon="close"
                            style={{ position: 'absolute', top: 10, right: 10 }}
                            onClick={onClose}
                        />
                    </h4>
                </Modal.Header>
                <Modal.Content>
                    {versionedSubslides.length === 0 ? (
                        <div>
                            <strong>No versions available</strong>
                        </div>
                    ) : (
                            <div>
                                {versionedSubslides.map((versionedSubslide, index) => {
                                    const notCurrentVersion = !subslide.translationVersionArticleId || (subslide.translationVersionArticleId !== versionedSubslide.articleId);
                                    const bgColor = notCurrentVersion ? '#d4e0ed' : '#1d3348';
                                    const color = notCurrentVersion ? 'rgba(0,0,0,.6)' : 'white';

                                    return (
                                        <div key={`versioned-subslide-${index}`} style={{ marginBottom: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Label
                                                    style={{
                                                        borderBottomRightRadius: '0',
                                                        borderBottomLeftRadius: '0',
                                                        fontSize: '0.8rem',
                                                        backgroundColor: bgColor,
                                                        color,
                                                    }}
                                                >
                                                    Translator {index + 1}
                                                </Label>
                                                {notCurrentVersion ? (
                                                    <div style={{ color: '#0e7ceb', cursor: 'pointer' }} onClick={() => onVersionChange(versionedSubslide.articleId)}>
                                                        Use this version
                                        </div>
                                                ) : (
                                                        <span>
                                                            <Icon name="check circle" color="green" />
                                                        </span>
                                                    )
                                                }
                                            </div>
                                            <div style={{ padding: '1rem', border: `solid 1px ${bgColor}` }}>
                                                {versionedSubslide.text}
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <span style={{ marginRight: 20 }}>Transcript all slides by</span>
                                    <Dropdown
                                        style={{ marginRight: 20 }}
                                        placeholder="Choose translator"
                                        value={this.state.selectedTranscribeAllIndex}
                                        onChange={(e, data) => this.setState({ selectedTranscribeAllIndex: data.value })}
                                        options={translationVersions.map((t, index) => ({ text: `Translator ${index + 1}`, value: index, key: `translator-select-${index + 1}` }))}
                                    />
                                    <Button
                                        primary
                                        basic
                                        onClick={() => this.props.onTranscribeAll(translationVersions[this.state.selectedTranscribeAllIndex]._id)}
                                    >
                                        Go
                                    </Button>
                                </div>
                            </div>
                        )}
                </Modal.Content>
            </Modal>
        )
    }
}


export default TranslationVersionSelectModal;