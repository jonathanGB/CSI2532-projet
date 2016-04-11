var QueryModel = require('../models/QueryModel');

exports.Query1 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery1((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 1';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query2 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery2((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 2';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query3 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery3((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 3';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query4 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery4((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 4';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query5 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery5((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 5';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query6 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery6((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 6';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query7 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery7((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 7';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query8 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery8((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 8';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query9 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery9((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 9';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query10 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery10((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 10';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query11 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery11((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 11';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query12 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery12((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 12';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query13 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery13((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 13';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query14 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery14((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 14';
    console.log(data);
    res.render('API_Query', result);
  });
};

exports.Query15 = (req, res) => {
  var data; // grab the response from the model

  QueryModel.GetQuery15((data) => {
    var result = {};
    result['data'] = data;
    result.queryTitle = 'Query 15';
    console.log(data);
    res.render('API_Query', result);
  });
};
