const should = require( 'should' );
const sinon = require( 'sinon' );
require( 'should-sinon' );
const mockSnsFactory = require( './mocks/mockSns' );
const mockTopicArnFactory = require( './mocks/mockTopicArnFactory' );

const PromisedSNS = require( '../index' );

describe( 'Promised SNS', () => {

    it( 'Should put validly published records to the configured topic', () => {

        const snsSpy = mockSnsFactory( false );
        const sns = new PromisedSNS( snsSpy );

        return sns.publish( { value: 1 }, 'topic' )
            .then( () => {
                snsSpy.publish.should.be.calledWithMatch( {
                    Message: JSON.stringify( { value: 1 } ),
                    TopicArn: "topic"
                } );
            } );

    } );

    it( 'Should publish string records as strings', () => {

        const snsSpy = mockSnsFactory( false );
        const sns = new PromisedSNS( snsSpy );

        return sns.publish( 'record', 'topic' )
            .then( () => {
                snsSpy.publish.should.be.calledWithMatch( {
                    Message: "record",
                    TopicArn: "topic"
                } );
            } );

    } );

    it( 'Should use a configured Topic ARN Factory when a topic is not provided', () => {

        const snsSpy = mockSnsFactory( false );
        const sns = new PromisedSNS( snsSpy, mockTopicArnFactory );

        return sns.publish( { value: 1 } )
            .then( () => {
                snsSpy.publish.should.be.calledWithMatch( {
                    Message: JSON.stringify( { value: 1 } ),
                    TopicArn: "topic"
                } );
            } );

    } );

    it( 'Should use a provided Topic ARN even if a Topic ARN Factory is configured', () => {

        const snsSpy = mockSnsFactory( false );
        const sns = new PromisedSNS( snsSpy, mockTopicArnFactory );

        return sns.publish( { value: 1 }, 'override' )
            .then( () => {
                snsSpy.publish.should.be.calledWithMatch( {
                    Message: JSON.stringify( { value: 1 } ),
                    TopicArn: "override"
                } );
            } );

    } );

    it( 'Should reject a publish request with no topic', () => {

        const snsSpy = mockSnsFactory( false );
        const sns = new PromisedSNS( snsSpy );

        return sns.publish( { value: 1 } )
            .should.be.rejected();

    } );

    it( 'Should reject a failed SNS publish attempt', () => {

        const snsSpy = mockSnsFactory( true );
        const sns = new PromisedSNS( snsSpy );

        return sns.publish( { value: 1 }, 'topic' )
            .should.be.rejected();

    } );

} );