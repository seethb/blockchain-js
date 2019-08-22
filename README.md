# blockchain-js'
library(SparkR)
library(httr)
library(jsonlite)
library(data.table)
library(dplyr)
cogapikey<-"768cd1470cb8457e8784250f25526a5c"
cogapi<-"https://eastus.api.cognitive.microsoft.com/text/analytics/v2.1/sentiment"

text=c("is this english?"
       ,"tak er der mere kage"
       ,"merci beaucoup"
       ,"guten morgen"
       ,"bonjour"
       ,"merde"
       ,"That's terrible"
       ,"R is awesome")

# Prep data
df<-data_frame(id=1:8,text)
mydata<-list(documents= df)
print(toJSON(mydata))
# Construct a request
print(cogapikey)
print(cogapi)
response<-POST(cogapi, 
               add_headers('Ocp-Apim-Subscription-Key' = cogapikey),
               body=toJSON(mydata))
print(response)
respcontent<-content(response, as="text")
fromJSON(respcontent)$documents %>%
   mutate(id=as.numeric(id)) ->
   responses
print(respcontent)
