<?php

namespace XVEngine\Core\Handler;

use InvalidArgumentException;


/**
 * Class AntiFlooderHandler
 * @author Krzysztof Bordeux Bednarczyk
 * @package XVEngine\Bundle\CoreBundle\Handler
 */
class AntiFlooderHandler extends AbstractHandler {

    /**
     * 
     * @var string
     */
    public $name = "antiFlooder";

    
    /**
     *
     * @var int
     */
    public $timeout;

    
    /**
     *
     * @var AbstractHandler
     */
    public $handlers = [];
    

    /**
     *
     * @var string 
     */
    public $id;


    /**
     * @param int $ms
     */
    public function __construct($ms = 10) {
        $this->setTimeout($ms);
        $this->setID(uniqid());
    }


    /**
     * Set flooder timeout
     *
     * @author Krzysztof Bednarczyk
     * @param $ms
     * @return $this
     */
    public function setTimeout($ms){
        $this->timeout = (int) $ms;
        return $this;
    }


    /**
     * Add handler to execute after timeout
     *
     * @author Krzysztof Bednarczyk
     * @param $handler
     * @param null $obj
     * @return $this
     */
    public function addHandler($handler, $obj = null){
        if(is_callable($handler)){
            $handler->bindTo($obj);
            $handler = $handler();
        }
        if( ! ($handler instanceof AbstractHandler)){
            throw new InvalidArgumentException("Should be handler here!");
        }
        
        
        $this->handlers[] = $handler;
        return $this;
    }
    
    
    /**
     * 
     * @param string $id
     * @return AntiFlooderHandler
     */
    public function setID($id){
        $this->id = $id;
        return $this;
    }


    /**
     * @inheritdoc
     */
    public function jsonSerialize() {
        return array(
            "name" => $this->name,
            'handlers' => $this->handlers,
            'timeout' => $this->timeout,
            'id' => $this->id
        );
    }

}
