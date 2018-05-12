export default {
  output: {
    format: 'umd',
    name: 'ngx-jwt'
  },
  external: [
    '@angular/core',
    '@angular/common/http',
    'jwt-inspect',
    'jwt-inspect/jwt-helper',
    'rxjs',
    'rxjs/operators'
  ],
  onwarn: (warning) => {
      const skip_codes = [
        'THIS_IS_UNDEFINED',
        'MISSING_GLOBAL_NAME'
      ];
      if ( skip_codes.indexOf(warning.code) != -1 ) {
        return;
      }
      console.error(warning);
  }
};
