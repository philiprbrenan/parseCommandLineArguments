# parseCommandLineArguments

Parse a string of command line arguments into positional and keyword parameters.

![Test](https://github.com/philiprbrenan/parseCommandLineArguments/workflows/Test/badge.svg?branch=master)

    const string  = "hello --person=name --location=world greeting -d1"
    
    const results = {"keywords"   :
                       {"person"  : "name",
                        "location": "world",
                        "d"       : "1",
                       },
                     "positionals": ["hello","greeting"]}
    
    assert.deepEqual(parseCommandLineArguments(string), results)
