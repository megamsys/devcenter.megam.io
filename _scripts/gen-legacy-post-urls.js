// Depends on gem jekyll-redirect-from
var fs = require('fs')
var path = require('path')
var SITE_DIR = path.dirname(__dirname) + '/_site'
var POSTS_DIR = path.dirname(__dirname) + '/_posts'


// redirect_from:
//   - /post/123456789/
//   - /post/123456789/my-amazing-post/

// var template = fs.readFileSync(__dirname + '/gen-legacy-post-urls.html', 'utf8');

function readdir(path, pat, fn) {
  return fs.readdirSync(path).forEach(function (f, i) {
    var m = f.match(pat);
    if (m) {
      fn(f, m, i);
    }
  })
}

// Adds redirect_from for legacy URL pattern "/:year/:month/:day/:title.html"

readdir(POSTS_DIR, /^(\d{4})-(\d{2})-(\d{2})-(.+)\.([^\.]+)$/, function(filename, m) {
  var oldURLPath = '/' + m[1] + '/' + m[2] + '/' + m[3] + '/' + m[4] + '.html';
  //if (filename.substr(0,13) !== '2009-01-09-hu') { return; } // XXX DEBUG

  var path = POSTS_DIR + '/' + filename;
  var src = fs.readFileSync(path, 'utf8');
  if (src.substr(0,4) !== '---\n') {
    console.error(path, 'does not begin with ---<LF>');
    process.exit(1);
    return;
  }

  var endFrontMatter = src.indexOf('\n---\n', 4);
  if (endFrontMatter === -1) {
    console.error(path, 'missing terminating front matter "---"');
    process.exit(1);
    return;
  }

  console.log(filename, '('+oldURLPath+')');
  var fmSrc = src.substring(4, endFrontMatter+1);

  // make sure there's not a redirect_from already
  var pat = /([^:]+)\:\s*([^\n]+)\s*\n/g, kv;
  while((kv = pat.exec(fmSrc)) !== null) {
    var k = kv[1], v = kv[2];
    //console.log('**', k, '=', v)
    if (k === 'redirect_from') {
      console.warn('[warn] ignoring existing redirect '+v+' in', filename);
      return;
    }
  }

  fmSrc += 'redirect_from: ["' + oldURLPath + '"]\n';

  // Glue back together and write
  src = src.substr(0, 4) + fmSrc + src.substr(endFrontMatter);
  fs.writeFileSync(path, src, 'utf8');
});


// readdir(SITE_DIR, /^\d{4}$/, function(year) {
//   var yearDir = SITE_DIR + '/' + year;
//   console.log(yearDir)
//   readdir(yearDir, /^\d{2}$/, function(month) {
//     var monthDir = yearDir + '/' + month;
//     console.log('  '+month)
//     readdir(monthDir, /^\d{2}$/, function(day) {
//       var dayDir = monthDir + '/' + day;
//       console.log('    '+day)
//       readdir(dayDir, /^(.+)\.html$/, function(filename, m) {
//         var path = dayDir + '/' + filename;
//         console.log('      '+m[1]+'  ('+path+')')
//       })
//     })
//   })
// })
