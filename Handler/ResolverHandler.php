<?php

namespace XVEngine\Core\Handler;

use InvalidArgumentException;



class ResolverHandler extends AbstractHandler {

    /**
     * 
     * @var string
     */
    public $name = "resolver";

    
    /**
     *
     * @var int
     */
    public $handlers = [];


    /**
     * Id of this resolver
     *
     * @var string 
     */
    public $id;


    /**
     * @param string $id Id of resolver
     */
    public function __construct($id) {
        $this->setID($id);
    }


    /**
     * Add handler when resolver is resolved
     *
     * @author Krzysztof Bednarczyk
     * @param callable|AbstractHandler $handler
     * @param null|Object $obj
     * @return $this
     */
    public function addHandler($handler, $obj = null){

        if(is_callable($handler)){
            $obj && $handler->bindTo($obj);
            $handler = $handler();
        }

        if(!($handler instanceof AbstractHandler)){
            throw new \InvalidargumentException();
        }
        $this->handlers[] = $handler;

        return $this;
    }


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
