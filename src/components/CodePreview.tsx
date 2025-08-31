import React, { useEffect, useState } from 'react';
import { Collapse, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import CodeHighlighter from './CodeHighlighter';
import useTabToggle from './useTabToggle';


type CodePreviewProps = {
    order?: number,
    open: boolean,
    heading?: string,
    previewSection?: any,
    htmlTabContent?: any,
    htmlTabInstruction?: any,
    reactTabContent?: string,
    vmTabContent?: string,
    vmTabInstruction?: any,
    reactTabInstruction?: any,
    cssTabContent?: string,
    cssTabInstruction?: any
    children?: React.ReactNode;
}

const getInitialActiveTab = (props: CodePreviewProps): string => {
    return props.htmlTabContent ? 'tab-1-' :
        props.reactTabContent ? 'tab-2-' :
            props.cssTabContent ? 'tab-3-' :
                'tab-4-';
};

const CodePreview = (props: CodePreviewProps) => {
    const {
        children,
        heading,
        previewSection,
        htmlTabContent,
        htmlTabInstruction,
        reactTabContent,
        vmTabContent,
        vmTabInstruction,
        reactTabInstruction,
        cssTabContent,
        cssTabInstruction,
        order,
        open
    } = props;
    const [activeTab, onToggleTab] = useTabToggle(getInitialActiveTab(props) + order);
    const [collapse, setCollapse] = useState(false);

    useEffect(() => {
        setCollapse(open);
    }, [open]);

    const onToggleCollapse = () => {
        setCollapse(prevState => !prevState);
    };

    return (
        <div className="content">
            <h4 className="mb-3">{heading} <span className="code-view" onClick={() => {
                onToggleCollapse();
            }}><i className="material-icons">code</i></span></h4>
            <div className="mb-4">
                {previewSection}
                {children}
            </div>
            <Collapse isOpen={collapse}>
                <Nav tabs>
                    {htmlTabContent && <NavItem>
                        <NavLink
                            className={(activeTab === 'tab-1-' + order) ? `active` : ``}
                            onClick={() => {
                                onToggleTab('tab-1-' + order);
                            }}> HTML </NavLink>
                    </NavItem>}
                    {reactTabContent && <NavItem>
                        <NavLink
                            className={(activeTab === 'tab-2-' + order) ? `active` : ``}
                            onClick={() => {
                                onToggleTab('tab-2-' + order);
                            }}> REACT </NavLink>
                    </NavItem>}

                    {cssTabContent && <NavItem>
                        <NavLink
                            className={(activeTab === 'tab-3-' + order) ? `active` : ``}
                            onClick={() => {
                                onToggleTab('tab-3-' + order);
                            }}
                        > SCSS </NavLink>
                    </NavItem>}
                    {vmTabContent && <NavItem>
                        <NavLink
                            className={(activeTab === 'tab-4-' + order) ? `active` : ``}
                            onClick={() => {
                                onToggleTab('tab-4-' + order);
                            }}
                        > VM </NavLink>
                    </NavItem>}
                </Nav>
                <TabContent activeTab={activeTab}>
                    {htmlTabContent && <TabPane tabId={'tab-1-' + order}>
                        <CodeHighlighter language="html" copyToClipboard={true}
                                         copyToClipboardButtonId={`html-${order}`}>
                            {htmlTabContent}
                        </CodeHighlighter>
                        {htmlTabInstruction}
                    </TabPane>}
                    {reactTabContent && <TabPane tabId={'tab-2-' + order} className="bg-white">
                        <CodeHighlighter language="jsx" copyToClipboard={true}
                                         copyToClipboardButtonId={`react-${order}`}>
                            {reactTabContent}
                        </CodeHighlighter>
                        {reactTabInstruction}
                    </TabPane>}

                    {cssTabContent && <TabPane tabId={'tab-3-' + order} className="bg-white">
                        <CodeHighlighter language="css" copyToClipboard={true}
                                         copyToClipboardButtonId={`css-${order}`}>
                            {cssTabContent}
                        </CodeHighlighter>
                        {cssTabInstruction}
                    </TabPane>}

                    {vmTabContent && <TabPane tabId={'tab-4-' + order} className="bg-white">
                        <CodeHighlighter language="html" copyToClipboard={true}
                                         copyToClipboardButtonId={`vm-${order}`}>
                            {vmTabContent}
                        </CodeHighlighter>
                        {vmTabInstruction}
                    </TabPane>}

                </TabContent>
            </Collapse>
        </div>
    );
};

export default CodePreview;
