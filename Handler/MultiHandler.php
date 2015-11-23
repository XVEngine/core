<?php

namespace XVEngine\Core\Handler;



class MultiHandler extends AbstractHandler {

    /**
     * Name of this handler
     * @var string
     */
    public $name = "multi";

    
    /**
     *
     * @var int
     */
    public $handlers = [];


    /**
     * ID of this handler
     * @var string 
     */
    public $id;


    /**
     * Add new handler
     *
     * @author Krzysztof Bednarczyk
     * @param AbstractHandler}callable $call
     * @param null|Object $obj
     * @return $this
     */
    public function addHandler($call, $obj = null){
        if($call instanceof AbstractHandler){
            $this->handlers[] = $call;
            return $this;
        }

        /**
         * var $obj callable
         */
        if($obj){
            $call->bindTo($obj);
        }

        $handler = $call();

        if(! ($handler instanceof AbstractHandler)){
            throw new \InvalidArgumentException();
        }

        $this->handlers[] = $handler;
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param AbstractHandler[] $array
     * @return $this
     */
    public function addHandlers(array $array){
        foreach($array as $item){
            $this->addHandler($item);
        }

        return $this;
    }


    /**
     * Use addHandler method
     * @deprecated
     * @author Krzysztof Bednarczyk
     * @param AbstractHandler $handler
     * @return $this
     */
    public function addRawHandler(AbstractHandler $handler){
        return $this->addHandler($handler);
    }





    /**
     * Join response from AjaxResponse object
     *
     * @author Krzysztof Bednarczyk
     * @param AjaxResponse $response
     * @return $this
     */
    /*public function joinResponse(AjaxResponse $response){
        foreach($response->getHandlers() as $handler){
            $this->addHandler($handler);
        }
        return $this;
    }*/


    /**
     * @inheritdoc
     */
    public function jsonSerialize() {
        return array(
            "name" => $this->name,
            'handlers' => $this->handlers,
            'id' => $this->id
        );
    }

}
