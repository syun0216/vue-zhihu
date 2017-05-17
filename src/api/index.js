import axios from 'axios';
import {
	NewsResource,
	NewsIdResource,
	NewsDateResource,
	NewsInfoResource,
	TopicsResource,
	TopicsIdResource,
	SectionsResource,
	SectionIdResource,
	CommentIdResource,
	LongComments,
	ShortComments,
  ImgUrl,
	HotUrl
} from "./config";

export default {
	getNews() {
		return axios.get( NewsResource ,{
			// timeout:500
		})
	},
	getNewsById( id ) {
		return axios.get( NewsIdResource + id ,{
			// timeout:4500
		})
	},
	getNewsByDate( date ) {
		return axios.get( NewsDateResource + date ,{
			timeout:4500
		})
	},
	getNewsInfoById( id ) {
		return axios.get( NewsInfoResource, {
			params: {
				id: id
			}
		} )
	},
	getTopics() {
		return axios.get( TopicsResource ,{

		})
	},
	getTopicsById( topicid ) {
		return axios.get( TopicsIdResource + topicid ,{
			// timeout:4500
		})
	},
	getSections() {
		return axios.get( SectionsResource )
	},
	getSectionsById( sectionid ) {
		return axios.get( SectionIdResource, {
			params: {
				sectionid: sectionid
			}
		} )
	},
	getCommentsById(id){
		return axios.get( CommentIdResource + id)
	},
	getLongComments(id){
		return axios.get( LongComments + id + "/long-comments");
	},
	getShortComments(id){
		return axios.get( ShortComments + id + "/short-comments");
	},
  getFirstPageImg(){
	  return axios.get( ImgUrl );
  },
	getHotNews(){
		return axios.get( HotUrl );
	}
}
