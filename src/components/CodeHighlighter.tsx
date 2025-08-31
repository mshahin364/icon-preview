import React, {useEffect} from "react";
import Prism from "prismjs";
import 'prismjs/components/prism-jsx.min';
import 'prismjs/plugins/line-numbers/prism-line-numbers.min';
import CopyToClipboard from "./CopyToClipboard";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";


type CodeHighlighterType = {
    children: React.ReactNode;
    language: string;
    copyToClipboard: boolean;
    copyToClipboardButtonId: string;
}

const CodeHighlighter = ({children, language, copyToClipboard, copyToClipboardButtonId}: CodeHighlighterType) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <div className="code-highlighter">
            {copyToClipboard && <CopyToClipboard id={copyToClipboardButtonId}>{children}</CopyToClipboard>}
            <pre className="line-numbers mt-0">
                <code className={`language-${language}`}>
                    {children}
                </code>
            </pre>
        </div>
    );
};

export default CodeHighlighter;
