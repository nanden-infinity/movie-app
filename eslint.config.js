export default [
  {
    rules: {
      // "no-console": "error",
      indent: ['error', 2],
      'keyword-spacing':
        'error' /* Esse regra ajuda quando nao temos o espaco no if sem espace */,
      // 'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'no-multiple-empty-lines': 'error',
      'eol-last': ['error', 'always'],
      semi: ['error', 'always'],
      'no-trailing-spaces': 'error',
      'operator-assignment':
        'error' /* Esse regra esta dizendo  para usar += em vez de soma = + soma */,
      'no-inner-declarations': [
        'error',
        'functions',
        { blockScopedFunctions: 'disallow' },
      ],
    },
  },
];
