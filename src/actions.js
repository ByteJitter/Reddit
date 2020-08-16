import fetch from "cross-fetch";
//
export const SELECT_SUBREDDIT = "SELECT_SUBBREDDIT";

export function select_Subreddit(subreddit){
    return {
        type:SELECT_SUBREDDIT,
        subreddit
    }
}

//
export const INVALIDATE_SUBREDDIT =  "INVALIDATE_SUBREDDIT";

export function invalidateSubreddit(subreddit){
    return {
        type:INVALIDATE_SUBREDDIT,
        subreddit
    }
}

//
export const REQUEST_POSTS = "REQUEST_POSTS";

export function requestPosts(subreddit){
    return {
        type:requestPosts,
        subreddit
    }
}

//
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export function receivePosts(subreddit, json){
    return {
        type:RECEIVE_POSTS,
        subreddit,
        posts:json.data.children.map(child => child.data),
        receivedAt:Date.now()
    }
}


//
export function fetchPosts(subreddit){
    return function(dispatch){
        dispatch(requestPosts(subreddit));

        return fetch(/* `http://www.subreddit.com/r/${subreddit}.json` */"http://rap2.taobao.org:38080/app/mock/264014/getSubreddit")
            .then(
                response => response.json(),
                error => console.log(error)
            )
            .then(
                
                json => {dispatch(receivePosts(subreddit, json))
                    console.log(`fetch data:${json}`)}
            )
    }
}

export function shouldFetchPosts(state, subreddit){
    const posts = state.postsBySubreddit[subreddit];
    if(!posts)
        return true;
    else if(posts.isFetching)
        return false;
    else
        return posts.didInvalidate
}

export function fetchPostsIfNeeded(subreddit){
    return(dispatch, getState) => {
        if(shouldFetchPosts(getState(), subreddit))
            return dispatch(fetchPosts(subreddit));
        else
            return Promise.resolve();
    }
}