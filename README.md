# AtNorth frontend assignment

This is my submission for the frontend assignment for atNorth. In the following sections I will tell you about the setup and my design decisions.

## MSW

I use MSW to mock the user session and api calls, this showcases the app under more realistic settings with random pauses from the server and random data. This is what I used in my old stack and I really love this product, it is mature and super well documented.

## API layer

I used KY here just because the fetch code looked super bad. A note about this, I would handle all the server errors in the api section and throw an APIResponseError there and use that in the stores but due to time issues I skipped it. I would not hand something like this in to prod, is what I am trying to say.

## Testing

I only tested the from the mocks to the store, the ui part is completely untested. I took a look over some of the libraries but due to time issues I am skipping the testing for the UI

## UX

Overall I think this turned out alright. I would have had more time I would of made the table expandable and hide columns based on the media queries, but other than that I am pretty pleased with how this turned out. It was pretty hard figuring out the dimensions from the image in the pdf and the color palette being used, but I tried to use as much of the default color except where I thought they differed too much from the image.

## Docker

It is just a super simple nginx image copies the project over to the container and the a new nginx config

```sh
docker build -t atnorth .
```

```sh
docker run -d -p 8080:80 atnorth
```

the project will be accessible at port 8080
