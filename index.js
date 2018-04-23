const PromisedSNS = function( sns, topicArnFactory ) {

    this.publish = function( record, topicArn ) {

        if ( !topicArn && !topicArnFactory ) {
            return Promise.reject( new Error( 'No topicArn or topicArnFactory provided'))
        }
        return new Promise( ( resolve, reject ) => {

            try {
                sns.publish( {
                    Message: typeof record === 'object' ? JSON.stringify( record ) : record,
                    TopicArn: topicArn ? topicArn : topicArnFactory( record )
                }, ( err, data ) => {
                    if ( err ) {
                        return reject( err );
                    }

                    resolve( data );
                } );
            } catch( e ) {
                reject( e );
            }

        } );
    }

};

const typeTopicArnLookupFactory = require( './factories/typeTopicArnLookupFactory' );

PromisedSNS.factories = {
    typeTopicArnLookupFactory: typeTopicArnLookupFactory
};

module.exports = PromisedSNS;
