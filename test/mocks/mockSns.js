const sinon = require( 'sinon' );

const mockSnsFactory = function( errors ) {

    const mockSns = {
        publish: ( options, callback ) => {
            if ( errors ) {
                callback( new Error(), null );
            } else {
                callback( null, {} );
            }
        }
    };

    sinon.spy( mockSns, 'publish' );

    return mockSns;

};

module.exports = mockSnsFactory;
