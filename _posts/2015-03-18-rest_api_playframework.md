---
title: Beautiful API using Scala based Playframework
slug: rest_api_playframework
date_published: 2015-03-18T10:19:27.209Z
date_updated:   2015-03-19T04:24:45.357Z
---

We are going to build a beautiful REST API based on a modern [playframework](www.playframework.com) using [Scala](scala-lang.org) in a functional way.

Let us start by understanding the concept of REST in a simpler sense.

##RESTful API
[REST](http://en.wikipedia.org/wiki/Representational_state_transfer) came from Roy Fieldings desertation in claiming to make web stateles again based on designing your system using nouns. So some of the examples are

* accounts 
* users
* profiles
* logs
* assemblies
* apps

You no longer need the clugy [SOAP](http://en.wikipedia.org/wiki/SOAP) heavyweight XML, but rather a nimble JSON using fundamental HTTP will do.

How do you arrive on a design for the RESTful approach for your system is beyond the scope of this article. However we recommend you to read about [apigees REST API Design](http://apigee.com/about/resources/webcasts/restful-api-design-second-edition), which talks about the same.

The RESTful API's transport mechanism is pure [HTTP](https://www.ietf.org/rfc/rfc2616.txt)

We will use [HMAC](http://en.wikipedia.org/wiki/Hash-based_message_authentication_code) to encrypt the payload sent across from a client. 

The client code we will use in our usecase will be Ruby or Scala.

First let us start with the core *HTTP payload* we would like to send across.

The constructs of the payload which would help us multi tenantized system are, 

###Parts of the payload. 

- HEADER

Our header that we wish to send will have the following

X_Megam_EMAIL  - The email address of the user
X_Megam_APIKEY - The api key generated for the user
X_Megam_DATE   - The date on which the data was sent
X_Megam_HMAC   - The MD5 hmac calculated by the client in the format of **email:hmac value**
Path           - URL path from the HTTP Request

The HMAC value is calculated as follows 
X_Megam_DATE +  Path + MD5(body JSON)

The HMAC string makes sure the payload sent from the client is well formed and is valid.

* BODY
A JSON as sent by  the client. The body JSON may or may not be present. In case where a HTTP GET is done there body will be empty

####HEADER

    
Sample scala code in building Header.
 
    val defaultHeaderOpt = Map(Content_Type -> application_json,
    X_Megam_EMAIL -> "megam@mypaas.io", X_Megam_APIKEY -> "IamAtlas{74}NobodyCanSeeME#07",
    //X_Megam_EMAIL -> "fake@mypaas.io", X_Megam_APIKEY -> "fakemypaas#megam",
   // X_Megam_EMAIL -> "steve@olympics.com", X_Megam_APIKEY -> "mAFfm45XnvYJMqPTpP5Dow==",
    X_Megam_DATE -> currentDate, Accept -> application_vnd_megam_json)

####BODY

Sample scala code.

    val contentToEncode = "{\"collapsedmail\":\"megam@mypaas.io\", \"inval_api_key\":\"IamAtlas{74}NobodyCanSeeME#075488\", \"authority\":\"user\" }"

####HMAC

We design a cryptographic hash based on the popular MD5 or SHA1 which can be encrypted during the send and decrypted upon receipt.

Now that we have set the playground for the various definitions let us put to use in the platframework.

Our RESTful API Serveer will be named as megam_gateway and is designed to be stateless.

###Approach
We will use a novel approach to authenticate and authorize any request that come to our megam_gateway. The approach should be intelligent enought to authenticate any number of layers, return back on malformed header (invalid email could be one of them), mismatch API key and exception condition in megam_gateway.

###Controller
A regular controller which the requests coming in to the megam_gateway.

###play-auth
An authentication library that helps to quickly build authentication function in a play project. 


###APIAuthElement : Extension of StackActionController 
A trait, that extends a StackActionController and 
can be invoked by extending this trait in relevant controller.

    object Accounts extends Controller with APIAuthElement {

Also you have coarse control to decide if you wish to authenticate all HTTP verbs or not. 

For instance when an account is created initially there is no point authenticating, you know why.

If an authentication is needed, then we wrap the particular action in controller using StackAction.

    def show(id: String) = StackAction(parse.tolerantText) { implicit request =>

You can read the guide availabe in [play-auth](https://github.com/t2v/play2-auth) for more information.

###SecurityActions
A helper function that handles authentication after everything is verified. 

Lets put everything together and create our first api **accounts**

##Step 1: FunnelRequest

The first step we do is to find those actions in the controller that require authentication. We wrap them  with **StackAction**.

    trait APIAuthElement extends StackableController 

The trait has an implicit which helps to converts the input HTTPRequest inputs to a **FunnelRequest** The **FunnelRequest** just maps the HTTPRequestInput and maps the header, body, hmac to an internal object.

##Step 2: Validate FunnelRequest

After that the SecurityActions.Authenticates the FunnelRequest Object and returns to serve the request if every is valid. If the Header is malformed its immediately sent back. 

    object SecurityActions {

 
  def Authenticated[A](req: FunnelRequestBuilder[A]): ValidationNel[Throwable, Option[String]] = {
    Logger.debug(("%-20s -->[%s]").format("SecurityActions", "Authenticated:Entry"))
    req.funneled match {

###Step3: Serve the request.

Now when things are validated, the controller handles the request

    def show(id: String) = StackAction(parse.tolerantText) { implicit request =>
    play.api.Logger.debug(("%-20s -->[%s]").format("controllers.Accounts", "show:Entry"))
    play.api.Logger.debug(("%-20s -->[%s]").format("email", id))
    models.Accounts.findByEmail(id) match {


We saw bits and pieces on how everything comes together. Let us look at how to implement an account..

##Account 

/accounts
Let us implement the simple API which has the following requirements   
  
  
<table>
    <tr>
        <td>HTTP Verb</td>
        <td>REST API</td>
        <td>Description</td>
    </tr>
    <tr>
        <td>GET</td>
        <td>accounts</td>
        <td>GET the account information of the user
    </tr>
    <tr>
        <td>POST</td>
        <td>accounts</td>
        <td>Posts a new account</td>
    </tr>
    
   
</table>

Great. For both of the functions we need a controller.

#AccountsController

    import controllers.funnel.FunnelErrors._
    import controllers.funnel.FunnelResponse
    import models._
    import play.api._
    import play.api.mvc._
    import play.api.mvc.Result
    import scalaz._
    import Scalaz._
    import scalaz.effect.IO
    import scalaz.EitherT._
    import scalaz.Validation
    //import scalaz.Validation.FlatMap._
    import scalaz.NonEmptyList._

    /**
     * @author rajthilak
     *
     */

    /*
    * This controller performs onboarding a customer and     registers an email/api_key 
    * into riak.
    * Output: FunnelResponse as JSON with the msg.  
    */
    object Accounts extends Controller with APIAuthElement {


You can see that we are using the APIAuthElement here which means we are indicating that our controller needs to authenticated.

Click here for full source code of the [AccountsController](https://github.com/megamsys/megam_gateway/blob/0.7/app/controllers/Accounts.scala).


###POST

/accounts

Let us hack an action method, that pulls the email and api_key and stores in a storage. How store and manipulate JSON will be dealt in another tutorial.

    def post = Action(parse.tolerantText) { implicit request =>
    play.api.Logger.debug(("%-20s -->[%s]").format("controllers.Accounts", "post:Entry"))
    val input = (request.body).toString()
    play.api.Logger.debug(("%-20s -->[%s]").format("input", input))
    models.Accounts.create(input) match {
      case Success(succ) =>    
        PlatformAppPrimer.clone_predefcloud(succ.get.email).flatMap { x =>
          Status(CREATED)(
            FunnelResponse(CREATED, """Onboard successful. email '%s' and api_key '%s' is registered.""".
              format(succ.get.email, succ.get.api_key).stripMargin, "Megam::Account").toJson(true)).successNel[Error]
        } match {
          case Success(succ_cpc) => succ_cpc
          case Failure(errcpc) =>
            val rncpc: FunnelResponse = new HttpReturningError(errcpc)
            Status(rncpc.code)(rncpc.toJson(true))
        }
              
        PlatformAppPrimer.clone_organizations(succ.get.email).flatMap { x =>
          Status(CREATED)(
            FunnelResponse(CREATED, """Onboard successful. email '%s' and api_key '%s' is registered.""".
              format(succ.get.email,succ.get.api_key).stripMargin, "Megam::Account").toJson(true)).successNel[Error]
        } match {
          case Success(succ_cpc) => succ_cpc
          case Failure(errcpc) =>
            val rncpc: FunnelResponse = new HttpReturningError(errcpc)
            Status(rncpc.code)(rncpc.toJson(true))
        }

       
  
        case Failure(err) => {
        val rn: FunnelResponse = new HttpReturningError(err)
        Status(rn.code)(rn.toJson(true))
      }
    }
  }


Ofcourse we more more things after an user is registered, those are system specific. For instance we create default settings for an user after getting registered successfuly.

A good api, communicates to an user the correct success JSON or an Error

After all is well done, we send back a **FunnelResponse**. Stay tuned we will cover it in the next part


###GET

/accounts/:id

Let us hack an action method, in this case you can see that we are using **StackAction**. 

You can see that we don't tell what needs to be done to authenticate, it all happens magically with the set framework. 


    def show(id: String) = StackAction(parse.tolerantText) { implicit request =>
    play.api.Logger.debug(("%-20s -->[%s]").format("controllers.Accounts", "show:Entry"))
    play.api.Logger.debug(("%-20s -->[%s]").format("email", id))
    models.Accounts.findByEmail(id) match {
      case Success(succ) => {
        Ok((succ.map(s => s.toJson(true))).getOrElse(
          AccountResult(id).toJson(true)))
      }
      case Failure(err) => {
        val rn: FunnelResponse = new HttpReturningError(err)
        Status(rn.code)(rn.toJson(true))
      }
    }

  }
  
Ok. this is the first part of the series, we are done with the authentication. 

In the subsequent parts we will cover JSON Convertors, FunnelResponse, Cache using StateMonad, IO Monad, Validation of Scalaz.

Here is the [full source code](https://github.com/megamsys/megam_gateway.git) of the project.

            

