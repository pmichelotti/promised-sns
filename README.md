# Promised SNS 

A simple promise based wrapper around SNS Publish.

## Usage

```
npm install promised-sns
```

```javascript
const AWS = require( 'aws-sdk' );
const PromisedSNS = require( 'promised-sns' );

const sns = new PromisedSNS( new AWS.SNS() ); 
```

### `PromisedSNS( sns[, topicArnFactory ] )`

* `sns`: An AWS SNS instance
* `topicArnFactory`: Optional.  A factory function generating 
  topic ARNs based on records.
  * `String topicArnFactory( record )`
  
### `Promise publish( record[, topicArn ] )`

Publishes a record to a SNS topic.  If the record is an object it 
will be stringified, otherwise it will be written as is.  

If no topicArn is provided the topicArnFactory will be used 
to generate a topic ARN based on the record.  If neither a 
topicArn nor a topicArnFactory is provided the Promise is 
rejected.

### Type Topic ARN Lookup Factory

A simple topicArnFactory which takes as initial configuration a 
map of record types to topic ARNs.  It expects each record to have 
a `type` attribute which it uses to look up an appropriate ARN 
in it's map.

```javascript
const typeTopicArnLookupFactory = require( 'promised-sns' ).factories.typeTopicArnLookupFactory;

const topicArnFactory = typeTopicArnLookupFactory( {
    "publish": "Publish topic ARN",
    "unpublish": "Unpublish topic ARN"
} );
```

If a record is passed without a `type` property or if the value 
of type can not be mapped to an ARN an Error is thrown. 
