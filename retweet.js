const Twitter = require('twitter')

const consumer_key = 'Cznw5UT8quGj9LB2oDSZgrPkM'
const consumer_secret = 'GQLhMTOGyEoxHUBvvxTzTsJnwgWzerEaLkkX9I8O5d73iIqPkC'

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})

async function getTweets() {
  return new Promise((resolve, reject) => {
    const retweets = []
    const params = {count: 200, include_rts: false, screen_name: 'PremiumMalts_jp', exclude_replies: true}
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (!error) {
        const regexp = /(?=.*応募)(?=.*RT)/g
        tweets.forEach(t => {
          if (regexp.test(t.text)) retweets.push(t.id_str)
        })
        resolve(retweets)
      }
    })
  })
}

async function retweet(id) {
  return new Promise((res, rej) => {
    const params = {id}
    client.post('statuses/retweet', params, (err, tweets, response) => {
      if (!err) res(response)
      else rej(err)
    })
  })
}

async function show(id) {
  return new Promise((res, rej) => {
    const params = {id}
    client.get('statuses/show', params, (err, tweets, response) => {
      if (!err) res(tweets)
      else rej(err)
    })
  })
}
async function main() {
  const ret = await getTweets()
  // for (let r of ret) {
    const result = await retweet(ret[0])
    // const result = await show(r)
  // }
}
main()
