export default () => ({
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    /* logging: false, */
    /* timezone: '+3', */
  },
  /* emailer: { */
  /*   transport: { */
  /*     host: process.env.EMAIL_HOST, */
  /*     port: parseInt(process.env.EMAIL_PORT, 10) || 465, */
  /*     secure: true, // upgrade later with STARTTLS */
  /*     auth: { */
  /*       user: process.env.EMAIL_USER, */
  /*       pass: process.env.EMAIL_PASS, */
  /*     }, */
  /*   }, */
  /*   defaults: { */
  /*     from: '"Punto Pago" <info@puntopago.co>', */
  /*   }, */
  /*   template: { */
  /*     dir: process.cwd() + '/templates/', */
  /*     adapter: new HandlebarsAdapter(), // or new PugAdapter() */
  /*     options: { */
  /*       strict: true, */
  /*     }, */
  /*   }, */
  /* }, */
});
