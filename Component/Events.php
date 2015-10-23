<?php

namespace XVEngine\Core\Component;

use XVEngine\Core\Handler\AbstractHandler;


/**
 * Class Events
 * @author Krzysztof Bednarczyk
 * @package XVEngine\Core\Component
 */
class Events {


    /**
     * Events list
     * @var AbstractHandler[]
     */
    public $eventHandlers = [];



    /**
     * Bind event to component.
     * @param string $eventName
     * @param callable|AbstractHandler $handler
     * @param Object|null $obj
     * @return $this
     */
    public function on($eventName, $handler, $obj = null){
        if(is_callable($handler)){
            if($obj){
                $handler->bindTo($obj);
            }
            $handler = $handler($this);
        }

        if(!($handler instanceof AbstractHandler)){
            throw new \InvalidargumentException();
        }
        
        if (!isset($this->eventHandlers[$eventName])) {
            $this->eventHandlers[$eventName] = [];
        }
        $this->eventHandlers[$eventName][] = $handler;
        return $this;
    }
    
    
    /**
     * Remove events bined on "eventName"
     * @param string $eventName
     * @return $this
     */
    public function off($eventName){
        if(isset($this->eventHandlers[$eventName])){
            unset($this->eventHandlers[$eventName]);
        }
        return $this;
    }


    /**
     * Get all inserted events
     * @author Krzysztof Bednarczyk
     * @return AbstractHandler[]
     */
    public function getEvents(){
        return $this->eventHandlers;
    }

}
