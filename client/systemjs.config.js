System.config({
  paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
  },
  map: {
    'rxjs'                                : 'npm:rxjs',
    '@angular/core'                       : 'node_modules/@angular/core/bundles/core.umd.js',
    '@angular/common'                     : 'npm:@angular/common/bundles/common.umd.js',
    '@angular/router'                     : 'npm:@angular/router/bundles/router.umd.js',
    '@angular/compiler'                   : 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser'           : 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic'   : 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js'
  },
  packages: {
    'app'                                 : { defaultExtension: 'js'  },
    'rxjs'                                : { defaultExtension: 'js'  }
  }  
});
System.import('app/main').then(function(module) {
  console.log('loaded: '+ module);
}, function(err){
  console.log('error: ' + err);
})