//------------------------------------------------------------------------------
// Parse a command line string into positional and keyword arguments
// Philip R Brenan at gmail dot com, Appa Apps Ltd Inc., 2020
//------------------------------------------------------------------------------
"use strict"

function parseIntoWordsAndStrings(string)                                       // Parse a string into words and quoted strings. A space followed by a quote introduces a string, else a quote is just part of the word that constains it.
 {const p = []                                                                  // Parsed results as an array of words
  let q, s = 0;                                                                 // Current word, state

  function accept() {p.push(q); s = 0}                                          // Accept the current word

  for(const c of string)                                                        // Each character
   {if (s == 0 && c == ' ') continue                                            // Skip spaces while looking for a word or string

    if (s == 0)                                                                 // String
     {if      (c == "\'") {q = ''; s = 2}                                       // ' string
      else if (c == "\"") {q = ''; s = 3}                                       // " string
      else                {q = c;  s = 1}                                       // Word
     }
    else if (s == 1)                                                            // In word
     {if (c == " ")  accept(); else q += c
     }
    else if (s == 2)                                                            // In ' string
     {if (c == "\'") accept(); else q += c
     }
    else if (s == 3)                                                            // In " string
     {if (c == "\"") accept(); else q += c
     }
   }
  if (q.length > 0) accept()                                                    // Accept last word

  return p                                                                      // Array of words
 } // parseIntoWordsAndStrings

function parseCommandLineArguments(string)                                      // Parse the specified string into positional and keyword parameters.
 {const keywords = {}, positionals = []                                         // Keywords found, positional parameters found
  for(const word of parseIntoWordsAndStrings(string))                           // Each word in the input string
   {if (1)
     {const keyword = word.match(/^--+(\S+?)(=(.+))?$/)                         // --Keyword=parameter
      if (keyword !== null)
       {keywords[keyword[1].toLowerCase()] = keyword[3]
        continue
       }
     }
    if (1)
     {const keyword = word.match(/^-+(\S)(.+)?$/)                               // -Kparameter
      if (keyword !== null)
       {keywords[keyword[1]] = keyword[2]
        continue
       }
     }
    positionals.push(word)                                                      // Positional parameter
   }

  return {keywords, positionals}                                                // Keywords and positionals found
 } // parseCommandLineArguments

if (typeof document == 'undefined') try {                                       // Tests
  const assert = require('assert')

  if (1)                                                                        // Parse into words
   {const
      string  = ` aa12!    a'b   "aa !! ++ bb"  '  ',      '"'  "'"  ""   ''.`,
      results = ["aa12!", "a'b", "aa !! ++ bb", "  ", ",", '"', "'", "",  "", '.']

    assert.deepEqual(parseIntoWordsAndStrings(string), results)
   }

  if (1)                                                                        // Parse into arguments
   {const string  = "hello --person=name --location=world greeting -d1"
    const results = {"keywords":
                       {"person":"name",
                        "location":"world",
                        "d":"1",
                       },
                     "positionals": ["hello","greeting"]}
    assert.deepEqual(parseCommandLineArguments(string), results)
   }
 }
catch(e)
 {console.log(e)
 }

