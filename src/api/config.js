const ROOT_URL = "https://zhihu-agent.herokuapp.com/get?api=/";
let apiZhiHu = {
	news:'4/news/latest',
	newsbyid:'4/news/',
	newsbydate:'4/news/before/',
	newsinfo:'4/story-extra',
	topics:'4/themes',
	topicsbyid:'4/theme/',
	sections:'3/sections',
	sectionsbyid:'3/section',
	commentbyid:'/story-extra/',
	comments:'/story/'
}

const NEW_URL = "https://news-at.zhihu.com/api/4";

export const NewsResource = ROOT_URL.concat( apiZhiHu.news )
export const NewsIdResource = ROOT_URL.concat( apiZhiHu.newsbyid )
export const NewsDateResource = ROOT_URL.concat( apiZhiHu.newsbydate )
export const NewsInfoResource = ROOT_URL.concat( apiZhiHu.newsinfo )
export const TopicsResource = ROOT_URL.concat( apiZhiHu.topics )
export const TopicsIdResource = ROOT_URL.concat( apiZhiHu.topicsbyid )
export const SectionsResource = ROOT_URL.concat( apiZhiHu.sections )
export const SectionIdResource = ROOT_URL.concat( apiZhiHu.sectionbyid )

export const CommentIdResource = NEW_URL.concat(apiZhiHu.commentbyid)
export const LongComments = NEW_URL.concat(apiZhiHu.comments)
export const ShortComments = NEW_URL.concat(apiZhiHu.comments)
