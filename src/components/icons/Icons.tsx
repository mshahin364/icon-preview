import {Fragment, useEffect, useState} from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {Tooltip} from 'reactstrap';
import {html} from 'common-tags';
import svgIconsPath from './is-icon-defs.svg';
import CodePreview from "../CodePreview.tsx";
import {Icon} from "../Icon.tsx";
import { CollapseExpand } from "../CollapseExpand.tsx";

type IconValue = {
    name: string,
    tags?: string,
}
const Icons = () => {
    const [iconValues, setIconValues] = useState<IconValue[]>([]);
    const [searchResults, setSearchResults] = useState<IconValue[]>([])
    const [searchValue, setSearchValue] = useState<string>('');
    const [tooltipTarget, setTooltipTarget] = useState('');

    const getIcons = async (url: string) => {
        try {
            const response = await fetch(url);
            const textResponse = await response.text();
            const documentObject = (new window.DOMParser()).parseFromString(textResponse, "text/xml");
            const iconDefs = documentObject.getElementsByTagName('symbol');
            const icons: IconValue[] = [];

            Array.from(iconDefs).forEach(value => icons.push({
                name: value['id'],
                tags: value.dataset.tags
            }));

            setIconValues(icons);
            setSearchResults(icons);
        } catch (error: any) {
            console.error('Error fetching icons from ideascale UI', error)
        }
    }

    const search = (searchString: string) => {
        setSearchValue(searchString)

        if (searchString === "") {
            setSearchResults(iconValues)
            return
        }

        const searchTerms = searchString.toLowerCase().split(' ');

        const results = iconValues.filter((iconValue) => {
            const iconName = iconValue.name.toLowerCase();
            const iconTags = iconValue.tags?.toLowerCase();

            return searchTerms.every((term) => {
                return iconName.includes(term) || iconTags?.includes(term);
            });
        });

        setSearchResults(results)
    }

    const triggerCopyTooltip = (target: string) => {
        setTooltipTarget(target);
        setTimeout(() => {
            setTooltipTarget('')
        }, 1500)
    }

    useEffect(() => {
        getIcons(svgIconsPath).then();
    }, [])

    return (
        <section className="is-icons">
            <header>
                <h1 className="mb-3 heading-1">ICONS</h1>
                <CollapseExpand headerTitle="Instructions on naming and adding icons" svgIconSprite={svgIconsPath}>
                    <p>Icon names should be consistent, guessable and future proof. The name should describe what is
                        visually represented, not what the intended use of the icon is. With this in mind follow these
                        rules when adding a new icon:
                        <ul className='mt-2'>
                            <li>Check for existing icons first</li>
                            <li>Add a descriptive name in lower and kebab case</li>
                            <li>Include tags that will aid in search for the icon. Add space-separated key words to
                                the <code>data-tags</code> attribute in the definition for the icon svg.
                            </li>
                            <li>Try to find object names for the subject of the icon. <code><Icon
                                name="cart-flatbed-boxes" iconSpritePath={svgIconsPath}/> cart-flatbed-boxes</code></li>
                            <li>Additional information, such as modifiers or descriptions should be added as
                                suffixes. <code><Icon name="broom-sweeping"
                                                      iconSpritePath={svgIconsPath}/> broom-sweeping</code>
                            </li>
                            <li>When multiple objects present go foreground to background, left to right. <code><Icon
                                name="magnifying-glass-graph"
                                iconSpritePath={svgIconsPath}/> magnifying-glass-graph</code></li>
                            <li>Include direction for arrows. <code><Icon name="arrow-up-from-line"
                                                                          iconSpritePath={svgIconsPath}/> arrow-up-from-line</code>
                            </li>
                            <li>Use modifiers like 'outlined', 'solid', 'circle', 'box', 'rounded' as there can be
                                variations on the same object. <code><Icon name="exclamation-solid-triangle"
                                                                           iconSpritePath={svgIconsPath}/> exclamation-solid-triangle</code>
                            </li>
                        </ul>
                    </p>
                </CollapseExpand>
                <div className="search-group mt-5 mb-lg-1">
                    <input className="form-control text-start search-input"
                           type="text" name="searchIcons" value={searchValue}
                           onChange={(e) => search(e.target.value)}
                           placeholder={'Search icons...'}/>
                    <button type="submit">
                            <span role="presentation">
                                <Icon name="magnifying-glass-left" fill="#696a6e"
                                      iconSpritePath={svgIconsPath}/>
                            </span>
                    </button>
                </div>

            </header>
            <div className="mb-5">
                <CodePreview heading="" open={false}
                             htmlTabContent={
                                 html`
                                     <svg class="is-svg-icon is-member-management">
                                         <use xlink:href="#is-member-management"/>
                                     </svg>
                                 `
                             }
                             htmlTabInstruction={
                                 <ul className="ps-4">
                                     <li>
                                         <code className="class-name">#is-member-management</code> is the icon name
                                     </li>
                                     <li>
                                         <code className="class-name">.is-member-management</code> is the icon class
                                     </li>
                                 </ul>
                             }
                             vmTabContent={
                                 html`
                                     #svgIcon("create" "is-icon-pencil-menu" "12" "12" "#333")
                                 `
                             }
                             vmTabInstruction={
                                 <ul className="ps-4">
                                     <li>
                                         <strong>In here - </strong>
                                     </li>
                                     <li><span className="class-name">create</span> is a class name
                                     </li>
                                     <li>
                                         <span className="class-name">is-icon-pencil-menu</span> is icon name
                                     </li>
                                     <li>
                                         <span className="class-name">12</span> is width
                                     </li>
                                     <li>
                                         <span className="class-name">12</span> is height
                                     </li>
                                     <li>
                                         <span className="class-name">#333</span> is icon color
                                     </li>
                                     <li>By default <span className="class-name">aria-hidden</span> is true. Don't
                                         need declaration. For false just pass false
                                     </li>
                                 </ul>
                             }
                             reactTabContent={
                                 `<Icons className="" name="" fill="" width="" height="" ariaHidden={boolean} />`
                             }
                             reactTabInstruction={
                                 <ul className="ps-4">
                                     <li>Use <code className="class-name">className</code> prop to pass class in
                                         Icon
                                         component.
                                     </li>
                                     <li>Use <code className="class-name">name</code> prop to pass a name for Icon.
                                     </li>
                                     <li>Use <code className="class-name">fill</code> prop to pass color for Icon.
                                     </li>
                                     <li>Use <code className="class-name">width</code> prop to pass width for Icon.
                                     </li>
                                     <li>Use <code className="class-name">height</code> prop to pass height for
                                         Icon.
                                     </li>
                                     <li>Use <code className="class-name">ariaHidden</code> prop to pass true or
                                         false. By default
                                         it's true
                                     </li>
                                 </ul>
                             }
                />
            </div>
            <div className="d-flex flex-wrap align-items-stretch">
                {
                    searchResults &&
                    searchResults.sort((a, b) => a.name.localeCompare(b.name)).map(icon =>
                        <Fragment key={icon.name}>
                            <Tooltip placement="top" isOpen={tooltipTarget === icon.name} target={icon.name}>
                                Copied!
                            </Tooltip>
                            <CopyToClipboard text={icon.name} onCopy={triggerCopyTooltip}>
                                <div id={icon.name}
                                     className="icon-wrapper d-flex flex-column align-items-center justify-content-center">
                                    <div>
                                        <Icon name={icon.name} iconSpritePath={svgIconsPath}/>
                                    </div>
                                    <span className="font-monospace mt-3 text-center">{icon.name}</span>
                                </div>
                            </CopyToClipboard>
                        </Fragment>
                    )
                }
            </div>
        </section>
    )
};

export default Icons;