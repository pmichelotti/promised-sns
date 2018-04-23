module.exports = function( typeTopicMap ) {

    if ( !typeTopicMap ) {
        throw new Error( 'No value provided for typeTopicMap' );
    }

    return function( record ) {

        if ( !record.type ) {
            throw new Error( 'Type Topic ARN Factory requires a type parameter on message records.' );
        }

        if ( !typeTopicMap[ record.type ] ) {
            throw new Error( 'No topic configured for record type ' + record.type );
        }

        return typeTopicMap[ record.type ];

    };

};