const ROOT_URL = "https://zhihu-agent.herokuapp.com/get?api=/";
let apiZhiHu = {
	news:'4/news/latest',
	newsbyid:'4/news/',
	newsbydate:'4/news/before',
	newsinfo:'4/story-extra',
	topics:'4/themes',
	topicsbyid:'4/theme',
	sections:'3/sections',
	sectionsbyid:'3/section'
}

export const NewsResource = ROOT_URL.concat( apiZhiHu.news )
export const NewsIdResource = ROOT_URL.concat( apiZhiHu.newsbyid )
export const NewsDateResource = ROOT_URL.concat( apiZhiHu.newsbydate )
export const NewsInfoResource = ROOT_URL.concat( apiZhiHu.newsinfo )
export const TopicsResource = ROOT_URL.concat( apiZhiHu.topics )
export const TopicsIdResource = ROOT_URL.concat( apiZhiHu.topicbyid )
export const SectionsResource = ROOT_URL.concat( apiZhiHu.sections )
export const SectionIdResource = ROOT_URL.concat( apiZhiHu.sectionbyid )
