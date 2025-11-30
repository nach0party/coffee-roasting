## Django Rest framework - The Coffee Roasting API

You are viewing the backend for the coffee roasting api.
The goal is to setup models / structure into commonly used ideas when roasting coffee:

1. What Beans are we roasting?
   - What is the origin of the bean
   - What is the processing method,
   - What is the source of the bean (who did we buy it from)
   - What is the grade of the bean (SCA rating)
2. Are we re-roasting already established beans in this system?
3. Do we want to try a different type of roasting strategy on the beans?
4. Which roasting strategy produced the best outcome?
5. Can we provide some analytics on roasting strategies for the best outcome?
6. Are we able to hopefully gather information from our roaster and provide some analytics on roasting.
   - I'm using a Gene Cafe
   - Would be nice to support a variety of roasters and pick up on the actual roast data per machine

These are the types of questions we're trying to answer by making this app. Previously I was loading everything into google keep, however, after a year of maintaining my roasts like this (I roast 1lb every week in batches of 250g (1/2 lb)) it just became totally unmaintainable.
