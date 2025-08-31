import {type ElementType, type ReactElement, type ReactNode, useEffect, useState} from 'react';
import {Collapse} from 'reactstrap';
import {Icon} from './Icon';

type CollapseExpandType = {
    headerTitle: string;
    headerComponent?: ReactElement;
    headerTitleAttr?: string;
    children: ReactNode;
    svgIconSprite: string;
    defaultOpen?: boolean;
    headerUrl?: string;
    headerIcon?: string | ReactElement;
    headerClass?: string;
    containerClass?: string;
    collapseHeaderClass?: string;
    cardBodyClassName?: string;
    collapseIcon?: string | ReactElement;
    expandIcon?: string | ReactElement;
    headerTag?: ElementType;
    onOpened?: () => void;
    onClosed?: () => void;
    onEntering?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExiting?: () => void;
    onExited?: () => void;
    isOpen?: boolean;
    infoTip?: ReactElement;
    headerElement?: ReactElement;
    showHeaderElementOnlyWhenExpanded?: boolean;
}

export const CollapseExpand = (props: CollapseExpandType) => {
    const {
        headerTitle,
        headerTitleAttr,
        headerComponent,
        children,
        svgIconSprite,
        headerIcon,
        defaultOpen = false,
        headerUrl,
        headerClass,
        containerClass,
        collapseHeaderClass = '',
        collapseIcon,
        expandIcon,
        headerTag = 'h2',
        onOpened,
        onClosed,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        isOpen,
        infoTip,
        headerElement,
        cardBodyClassName = '',
        showHeaderElementOnlyWhenExpanded = false
    } = props;
    const HeaderTag = headerTag;

    const [open, toggle] = useState(defaultOpen);

    const renderTitle = () => {
        return headerUrl?.trim()
            ? <a target="_blank" rel="noreferrer" href={headerUrl}>{headerComponent || headerTitle}</a>
            : headerComponent || headerTitle;
    };

    useEffect(() => {
        if (isOpen !== undefined) {
            toggle(isOpen);
        }
    }, [isOpen]);

    return (
        <section className={`card panel collapse-expand-container border-0 ${containerClass && containerClass}`}>
            <header
                className={`card-header panel-heading d-flex justify-content-between align-items-center py-4 ${collapseHeaderClass}`}>
				<span
                    className={`collapsable-header-title d-flex align-items-center text-truncate ${headerClass ? headerClass : ''}`}>
					<HeaderTag className={`h6 fw-semibold mb-0 text-truncate ${headerClass ? headerClass : ''}`}
                               title={headerTitleAttr || headerTitle}>
						{
                            typeof (headerIcon) === 'string'
                                ? <Icon className="icon-link me-4 link-icon" name={headerIcon} width={14} height={14}
                                        iconSpritePath={svgIconSprite}/>
                                : headerIcon
                        }
                        {renderTitle()}
					</HeaderTag>
                    {
                        infoTip
                            ? infoTip
                            : null
                    }
				</span>
                <div className="d-flex align-items-center gap-4">
                    {
                        (!showHeaderElementOnlyWhenExpanded || (showHeaderElementOnlyWhenExpanded && open)) &&
                        headerElement
                    }
                    <button className="btn btn-link p-0"
                            type="button"
                            onClick={() => toggle(!open)}
                            aria-expanded={open}
                            aria-label={`${open ? 'Collapse' : 'Expand'} ${headerTitleAttr || headerTitle}`}>
                        {open
                            ? collapseIcon ? collapseIcon :
                                <>
                                    <Icon name="chevron-up" width={13} height={13}
                                          iconSpritePath={svgIconSprite} title="Collapse"/>
                                </>

                            : expandIcon ? expandIcon :
                                <>
                                    <Icon name="chevron-down" width={13} height={13}
                                          iconSpritePath={svgIconSprite} title="Expand"/>
                                </>
                        }
                    </button>
                </div>
            </header>
            <Collapse isOpen={open}
                      onOpened={onOpened}
                      onClosed={onClosed}
                      onEntering={onEntering}
                      onEntered={onEntered}
                      onExit={onExit}
                      onExiting={onExiting}
                      onExited={onExited}>
                <article className={`card-body ${cardBodyClassName}`} aria-label={headerTitleAttr || headerTitle}>
                    {children}
                </article>
            </Collapse>
        </section>
    );
};
