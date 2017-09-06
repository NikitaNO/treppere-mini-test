const config = {
  protocol: process.env.PROTOCOL || 'http',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '5000',
  theme: {
    name: 'Treppere',
    short_name: 'Tr'
  },
  graphql: {
    project_id: 'cj76dgl631h6k01330824ixpu',
    api: 'https://api.graph.cool/simple/v1/cj76dgl631h6k01330824ixpu'
  }
};

module.exports = config;