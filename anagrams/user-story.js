var user_story = {
    text: [
        'as a scrabble player',
        'I want a way to test that two strings are anagrams ',
        'so that I may improve my playing skills'
    ],
    problem: [
        'anagrams are two words or phrases that share all the same letters, just in a different order (e.g. <strong>cat</strong> and <strong>act</strong>)',
        'as the number of letters increases, the number of ways that the letters can be rearranged increases factorially (an 8 letter word can have (8*7*6*5*4*3*2*1)-1=40,319 possible anagrams)',
        'spaces do not count, so a two word phrase may be an anagram of a three word phrase (e.g. <strong>forty two</strong> and <strong>try two of</strong>), meaning two strings can be anagrams and have different lengths',
    ],
    need: [
        'a way of confirming that two strings are indeed anagrams'
    ],
    ask: [
        'a function which takes two strings and returns a boolean',
        'the return value should be TRUE if the characters of the first string can be rearranged to create the second string',
        'spaces should not influence the outcome',
        'non-letter characters (except spaces) should be treated like letters',
        'for simplicity and your sanity, the tokens of the two strings need not be English words'
    ],
    hint: [
        'Google for "<a href="http://www.google.com/search?q=anagram" target="_blank">anagram</a>" and you will get resources that may help you come up with test cases'
    ]
};
