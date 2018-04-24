import elasticsearch from 'elasticsearch-browser'
import config from './config.json'

export default new elasticsearch.Client(config)
