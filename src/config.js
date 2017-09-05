const config = {
  protocol: 'http',
  host: process.env.HOST || 'localhost',
  port: process.env.HOST || '5000',
  graphql: {
    project_id: 'cj76dgl631h6k01330824ixpu',
    api: 'https://api.graph.cool/simple/v1/cj76dgl631h6k01330824ixpu'
  }
};

module.exports = config;