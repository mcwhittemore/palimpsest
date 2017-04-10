var fs = require('fs');
var path = require('path');
var got = require('gh-got');

module.exports = function(args) {
  if (args[0] === undefined) {
    throw new Error('Must provide a directory');
  }

  var dir = path.join(process.cwd(), args[0]);
  var exists = true;
  try {
    fs.accessSync(dir);
  }
  catch (err) {
    exists = false;
  }

  if (exists) {
    throw new Error('You must create a new directory. This one exists.');
  }

  runner(dir).catch(err => { console.log(err); });
}


async function runner(dir) {
  var user = null;
  try {
    user = require('../.user.json');
  }
  catch(err) {}
  
  if (user === null) {
    user = await newUser();
  }
  var gist = await createGist(user.token, dir);
  clone(gist.body.id, dir);
  install(dir);
}

function install(dir) {
  require('child_process').execSync('npm install', {cwd: dir});
}

function createGist(token, dir) {
  var opts = {};
  opts.token = token;
  opts.body = {
    public: false,
    description: 'yet another palimpsest image',
    files: {
      'index.js': {content:fs.readFileSync(path.join(__dirname, 'base-gist.js')).toString() },
      'package.json': {
        content: JSON.stringify({
          public: false,
          dependencies: {
            palimpsest: require(path.join(__dirname, '../package.json')).version
          }
        }, null, 2)
      }
    }
  };
  return got('gists', opts).catch(err => {
    console.log(Object.keys(err));
    throw err;
  });
};

function clone(id, dir) {
  var ssh = `git@gist.github.com:${id}.git`;
  require('child_process').execSync(`git clone ${ssh} ${dir}`);
}

function newUser() {
  console.log('It looks like you haven\'t set palimpsest up for gist support yet');
  console.log('Please provide a github token with gist create access:');
  process.stdout.write('token: ');
  return new Promise((resolve, reject) => {
    process.stdin.on('data', function(data) {
      data = data.toString().trim();
      var user = {token:data};
      fs.writeFileSync(path.join(__dirname, '..', '.user.json'), JSON.stringify(user, null, 2));
      resolve(user);
    });
  });
}
