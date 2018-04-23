const should = require( 'should' );

const topicArnFactory = require( '../factories/typeTopicArnLookupFactory' );

describe( 'Type Topic ARN Lookup Factory', () => {

    const factory = topicArnFactory( {
        "type-1": "ARN-1",
        "type-2": "ARN-2"
    } );

    it( 'Should look up an ARN for a known type', () => {
        factory( { type: 'type-1' } ).should.equal( 'ARN-1' );
    } );

    it( 'Should error if no type is in the event', () => {

        should.throws( () => {
            factory( {} );
        } );

    } );

    it( 'Should error if no topic map is provided', () => {

        should.throws( () => {
            topicArnFactory();
        } );

    } );

} );