// var Bootstrap = require('react-bootstrap');
var $ = require('jquery');
var Auth = require('./auth.jsx')

var Deal = React.createClass({
  render: function() {
    return (
      <div className="deal col-md-6 col-sm-12">
        <div className="dealLogoDiv">
          <img src={this.props.image_name} className='dealLogo' />
        </div>
        <div className="dealInfoDiv">
          <h3 className="dealDescription">
            {this.props.description}
          </h3>
          <div className="restaurantName">
            {this.props.name}
          </div> 
          <div className="dealExpiration">
            {this.props.expiration}
          </div>
        </div>  
      </div>
    );
  }
});

var DealBox = React.createClass({
  loadDealsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data)
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  // handleCommentSubmit: function(comment) {
  //   var comments = this.state.data;
  //   Optimistically set an id on the new comment. It will be replaced by an
  //   id generated by the server. In a production application you would likely
  //   not use Date.now() for this and would have a more robust system in place.
  //   comment.id = Date.now();
  //   var newComments = comments.concat([comment]);
  //   this.setState({data: newComments});
  //   $.ajax({
  //     url: this.props.url,
  //     dataType: 'json',
  //     type: 'POST',
  //     data: comment,
  //     success: function(data) {
  //       this.setState({data: data});
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       this.setState({data: comments});
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   });
  // },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadDealsFromServer();
    // component.setState(data)


    // this.loadCommentsFromServer();
    // setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="dealBox">
        <h1>Deals</h1>
        <Auth />
        <DealList data={this.state.data} />
      </div>
    );
  }
});

var DealList = React.createClass({
  render: function() {
    var dealNodes = this.props.data.map(function(deal) {
      return (
        <Deal description={deal.description} expiration={deal.expiration} image_name={deal.image_name} name={deal.name} key={deal.id}>
        </Deal>
      );
    });
    return (
      <div className="dealList">
        {dealNodes}
      </div>
    );
  }
});


var DealsView = React.createClass({
  //getInitialState: ...
  //componentDidMount: ...
  render: function() {
    console.log("Replace me.")
  }
})



ReactDOM.render(
  <DealBox url='/api/getDeals' />,
  document.getElementById('app')
);

module.exports = {Main};
