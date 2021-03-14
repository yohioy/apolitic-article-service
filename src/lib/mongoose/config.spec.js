const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);

const { expect } = chai;

describe('src/lib/mongoose/config', () => {
  const config = require('./config');

  it('should return an Object', () => {
    expect(config).to.be.an('object');
    expect(config).to.have.property('uri').and.be.a('string');
    expect(config).to.have.property('options').and.be.an('object');
    expect(config.options).to.contain.keys(
      'auth',
      'authSource',
      'useUnifiedTopology',
      'useNewUrlParser',
      'ssl'
    );
    expect(config.options.auth).to.contain.keys('user', 'password');
  });
});
