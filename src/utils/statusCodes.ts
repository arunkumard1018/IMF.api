// response-codes.ts

// Enum to represent common HTTP status codes
export enum HttpStatusCode {
    /* 1xx Informational responses: The request was received, continuing process */

    /* The server has received the request headers and the client should proceed to send the request body. */
    CONTINUE = 100,

    /* The requester has asked the server to switch protocols and the server has agreed to do so. */
    SWITCHING_PROTOCOLS = 101,

    /* WebDAV: Processing request, but no response available yet. */
    PROCESSING = 102,

    /* The server is likely to return a success code, useful for sending early responses. */
    EARLY_HINTS = 103,

    /* 2xx Success: The action was successfully received, understood, and accepted */

    /* Standard response for successful HTTP requests. */
    OK = 200,

    /* The request has been fulfilled, resulting in the creation of a new resource. */
    CREATED = 201,

    /* The request has been accepted for processing, but the processing has not been completed. */
    ACCEPTED = 202,

    /* The request was successful but the information may be from another source. */
    NON_AUTHORITATIVE_INFORMATION = 203,

    /* The server successfully processed the request, but is not returning any content. */
    NO_CONTENT = 204,

    /* The server successfully processed the request, but requires the client to reset the view. */
    RESET_CONTENT = 205,

    /* The server is delivering only part of the resource due to a range header sent by the client. */
    PARTIAL_CONTENT = 206,

    /* 3xx Redirection: Further action needs to be taken to complete the request */

    /* The requested resource has multiple representations, each corresponding to a different URI. */
    MULTIPLE_CHOICES = 300,

    /* The requested resource has been permanently moved to a new URI. */
    MOVED_PERMANENTLY = 301,

    /* The requested resource resides temporarily under a different URI. */
    FOUND = 302,

    /* The response to the request can be found under another URI using a GET method. */
    SEE_OTHER = 303,

    /* The resource has not been modified since the last request. */
    NOT_MODIFIED = 304,

    /* The requested resource must be accessed through the proxy given by the Location header. */
    USE_PROXY = 305,

    /* The requested resource resides temporarily under a different URI, should be repeated using a different URI. */
    TEMPORARY_REDIRECT = 307,

    /* The requested resource is permanently available at a new URI. */
    PERMANENT_REDIRECT = 308,

    /* 4xx Client errors: The request contains bad syntax or cannot be fulfilled */

    /* The server could not understand the request due to invalid syntax. */
    BAD_REQUEST = 400,

    /* The client must authenticate itself to get the requested response. */
    UNAUTHORIZED = 401,

    /* Payment is required to access the requested resource. */
    PAYMENT_REQUIRED = 402,

    /* The client does not have access rights to the content. */
    FORBIDDEN = 403,

    /* The server can not find the requested resource. */
    NOT_FOUND = 404,

    /* The request method is known by the server but is not supported by the target resource. */
    METHOD_NOT_ALLOWED = 405,

    /* The server cannot produce a response matching the list of acceptable values defined in the request's proactive content negotiation headers. */
    NOT_ACCEPTABLE = 406,

    /* The client must authenticate itself to use a proxy. */
    PROXY_AUTHENTICATION_REQUIRED = 407,

    /* The server timed out waiting for the request. */
    REQUEST_TIMEOUT = 408,

    /* The request could not be completed due to a conflict with the current state of the target resource. */
    CONFLICT = 409,

    /* The requested resource is no longer available at the server and no forwarding address is known. */
    GONE = 410,

    /* The server refuses to process the request without a defined Content-Length. */
    LENGTH_REQUIRED = 411,

    /* One or more preconditions given in the request header fields evaluated to false. */
    PRECONDITION_FAILED = 412,

    /* The server is refusing to process a request because the request payload is larger than the server is willing or able to process. */
    PAYLOAD_TOO_LARGE = 413,

    /* The server is refusing to service the request because the request-target is longer than the server is willing to interpret. */
    URI_TOO_LONG = 414,

    /* The server is refusing to service the request because the payload is in a format not supported by this method on the target resource. */
    UNSUPPORTED_MEDIA_TYPE = 415,

    /* The client has asked for a portion of the file, but the server cannot supply that portion. */
    RANGE_NOT_SATISFIABLE = 416,

    /* The server cannot meet the requirements of the Expect request-header field. */
    EXPECTATION_FAILED = 417,

    /* The server refuses to brew coffee because it is, permanently, a teapot. */
    IM_A_TEAPOT = 418,

    /* The server is unable to perform the request due to a misdirected request. */
    MISDIRECTED_REQUEST = 421,

    /* The request was well-formed but was unable to be followed due to semantic errors. */
    UNPROCESSABLE_ENTITY = 422,

    /* The resource that is being accessed is locked. */
    LOCKED = 423,

    /* The request failed due to a failure of a previous request. */
    FAILED_DEPENDENCY = 424,

    /* The server is unwilling to risk processing a request that might be replayed. */
    TOO_EARLY = 425,

    /* The client should switch to a different protocol such as TLS/1.0. */
    UPGRADE_REQUIRED = 426,

    /* The origin server requires the request to be conditional. */
    PRECONDITION_REQUIRED = 428,

    /* The user has sent too many requests in a given amount of time ("rate limiting"). */
    TOO_MANY_REQUESTS = 429,

    /* The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large. */
    REQUEST_HEADER_FIELDS_TOO_LARGE = 431,

    /* The client requested a resource that is not available for legal reasons. */
    UNAVAILABLE_FOR_LEGAL_REASONS = 451,

    /* 5xx Server errors: The server failed to fulfill a valid request */

    /* The server encountered an unexpected condition that prevented it from fulfilling the request. */
    INTERNAL_SERVER_ERROR = 500,

    /* The server does not support the functionality required to fulfill the request. */
    NOT_IMPLEMENTED = 501,

    /* The server, while acting as a gateway or proxy, received an invalid response from the upstream server. */
    BAD_GATEWAY = 502,

    /* The server is currently unable to handle the request due to temporary overloading or maintenance of the server. */
    SERVICE_UNAVAILABLE = 503,

    /* The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server. */
    GATEWAY_TIMEOUT = 504,

    /* The server does not support the HTTP protocol version used in the request. */
    HTTP_VERSION_NOT_SUPPORTED = 505,

    /* Transparent content negotiation for the request results in a circular reference. */
    VARIANT_ALSO_NEGOTIATES = 506,

    /* The server is unable to store the representation needed to complete the request. */
    INSUFFICIENT_STORAGE = 507,

    /* The server detected an infinite loop while processing a request with "Depth: infinity". */
    LOOP_DETECTED = 508,

    /* Further extensions to the request are required for the server to fulfill it. */
    NOT_EXTENDED = 510,

    /* The client needs to authenticate to gain network access. */
    NETWORK_AUTHENTICATION_REQUIRED = 511,
}
