import * as React from "react"
import { FeedContainer } from "../containers/feed-container"
import { AnimationClassNames, Icon, FocusTrapZone } from "@fluentui/react"
import ArticleContainer from "../containers/article-container"
import { ViewType } from "../scripts/models/page"
import ArticleSearch from "./utils/article-search"

type PageProps = {
    menuOn: boolean
    settingsOn: boolean
    feeds: string[]
    itemId: string
    viewType: ViewType
    dismissItem: () => void
    offsetItem: (offset: number) => void
}

class Page extends React.Component<PageProps> {
    offsetItem = (event: React.MouseEvent, offset: number) => {
        event.stopPropagation()
        this.props.offsetItem(offset)
    }
    prevItem = (event: React.MouseEvent) => this.offsetItem(event, -1)
    nextItem = (event: React.MouseEvent) => this.offsetItem(event, 1)

    render = () => this.props.viewType == ViewType.Cards 
    ? (
        <>
            {this.props.settingsOn ? null :
            <div key="card" className={"main" + (this.props.menuOn ? " menu-on" : "")}>
                <ArticleSearch />
                {this.props.feeds.map(fid => (
                    <FeedContainer viewType={this.props.viewType} feedId={fid} key={fid} />
                ))}
            </div>}
            {this.props.itemId && (
                <FocusTrapZone 
                    ignoreExternalFocusing={true}
                    isClickableOutsideFocusTrap={true}
                    className="article-container"
                    onClick={this.props.dismissItem}>
                    <div className={"article-wrapper " + AnimationClassNames.slideUpIn20} onClick={e => e.stopPropagation()}>
                        <ArticleContainer itemId={this.props.itemId} />
                    </div>
                    <div className="btn-group prev"><a className="btn" onClick={this.prevItem}><Icon iconName="Back" /></a></div>
                    <div className="btn-group next"><a className="btn" onClick={this.nextItem}><Icon iconName="Forward" /></a></div>
                </FocusTrapZone>
            )}
        </>
    )
    : (
        <>
            {this.props.settingsOn ? null :
            <div key="list" className={"list-main" + (this.props.menuOn ? " menu-on" : "")}>
                <ArticleSearch />
                <div className="list-feed-container">
                    {this.props.feeds.map(fid => (
                        <FeedContainer viewType={this.props.viewType} feedId={fid} key={fid} />
                    ))}
                </div>
                {this.props.itemId 
                ? (
                    <div className="side-article-wrapper">
                        <ArticleContainer itemId={this.props.itemId} />
                    </div>
                )
                : (
                    <div className="side-logo-wrapper">
                        <img className="light" src="icons/logo-outline.svg" />
                        <img className="dark" src="icons/logo-outline-dark.svg" />
                    </div>
                )}
            </div>}
        </>
    )
}

export default Page