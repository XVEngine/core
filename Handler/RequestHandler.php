<?php

namespace XVEngine\Core\Handler;

class RequestHandler extends AbstractHandler {

    /**
     * 
     * @var string
     */
    public $name = "request";

    
    /**
     *
     * @var string 
     */
    private $url;
    
    /**
     *
     * @var mixed[string] 
     */
    private $post = [];
    
    /**
     *
     * @var mixed[string]
     */
    private $get = [];
    
    
    /**
     *
     * @var mixed[string] 
     */
    private $headers = [];
    
    /**
     *
     * @var mixed[string] 
     */
    private $file = [];
    
    
    /**
     *
     * @var mixed[] 
     */
    private $options = [];


    private $params = [];


    /**
     * 
     * @param string $url
     */
    public function __construct($url = "") {
        $this->setURL($url);
    }
    
    
    /**
     * 
     * @param string $url
     * @return RequestHandler
     */
    public function setURL($url){
        $this->url = $url;
        return $this;
    }


    /**
     * Add new post parameter to request
     *
     * @author Krzysztof Bednarczyk
     * @param string $key
     * @param mixed $value
     * @return $this
     */
    public function addPost($key, $value){
        $this->post[$key] = $value;
        
        return $this;
    }


    /**
     * Method replace in URL string passed in "$key" and replace with $value
     *
     * @author Krzysztof Bednarczyk
     * @param string $key
     * @param mixed $value
     * @return $this
     */
    public function addParam($key, $value){
        $this->params[$key] = $value;

        return $this;
    }


    /**
     * Method add get parameter to request
     *
     * @author Krzysztof Bednarczyk
     * @param string $key
     * @param mixed $value
     * @return $this
     */
    public function addGet($key, $value){
        $this->get[$key] = $value;
        
        return $this;
    }


    /**
     * Method add File to request.
     *
     * @author Krzysztof Bednarczyk
     * @param $key
     * @param $value
     * @return $this
     */
    public function addFile($key, $value){
        $this->file[$key] = $value;
        return $this;
    }


    /**
     * Method add header to request. Header should be stared with X-XV-*
     *
     * @author Krzysztof Bednarczyk
     * @param $key
     * @param $value
     * @return $this
     */
    public function addHeader($key, $value){
        $this->headers[$key] = $value;
        return $this;
    }


    /**
     * Method set option to Request class in Javascript. See javascript:app.services.request
     *
     * @author Krzysztof Bednarczyk
     * @param string $key
     * @param mixed$value
     * @return $this
     */
    public function setOption($key, $value){
        $this->options[$key] = $value;
        return $this;
    }


    /**
     * @inheritdoc
     */
    public function jsonSerialize() {
        return array(
            "name" => $this->name,
            "url" => $this->url,
            "post" => $this->post,
            "get" => $this->get,
            "files" => $this->file,
            "params" => $this->params,
            "headers" => $this->headers,
            "options" => $this->options
        );
    }

}
