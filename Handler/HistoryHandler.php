<?php

namespace XVEngine\Core\Handler;

/**
 * Class HistoryHandler
 * @author Krzysztof Bordeux Bednarczyk
 * @package XVEngine\Bundle\CoreBundle\Handler
 *
 * @method $this push(string $title, string $path)
 * @method $this replace(string $title, string $path)
 * @method $this back()
 * @method $this setTitle(string $title)
 */
class HistoryHandler extends AbstractHandler {

    /**
     *
     * @var string 
     */
    public $name = "history";
    
    /**
     *
     * @var mixed[]
     */
    private $operations = [];


    /**
     *
     * @author Krzysztof Bednarczyk
     * @param callable $foo
     * @param null $obj
     */
    public function setCustomBack(callable $foo, $obj = null){
        if($obj){
            $foo->bindTo($obj);
        }

        $this->operations[] = array(
            "method" => __FUNCTION__,
            "arguments" => [$foo()]
        );

    }


    /**
     * Method register all method calls on this object and repeat this on object in javascript
     *
     * @author Krzysztof Bednarczyk
     * @param string $method
     * @param $arguments
     * @return $this
     */
    public function __call($method, $arguments) {
        $this->operations[] = array(
            "method" => $method,
            "arguments" => $arguments
        );
        return $this;
    }


    /**
     * Bind event to service
     *
     * @author Krzysztof Bednarczyk
     * @param string $eventName
     * @param AbstractHandler|callable $handler
     * @param null|Object $obj
     * @return $this
     */
    public function on($eventName , $handler , $obj = null){
        if(is_callable($handler)){
            if($obj){
                $handler->bindTo($obj);
            }
            $handler = $handler();
        }
        
        $this->operations[] = array(
            "method" => "on",
            "arguments" => [$eventName, $handler]
        );

        return $this;
    }


    /**
     * Method disable prev button
     *
     * @author Krzysztof Bednarczyk
     * @param bool $value
     * @return $this
     */
    public function disablePrev($value = true){
        $this->operations[] = array(
            "method" => __FUNCTION__,
            "arguments" => [!!$value]
        );
        return $this;
    }


    /**
     * @inheritdoc
     */
    public function jsonSerialize() {
        return array(
            "name" => $this->name,
            "operations" => $this->operations
        );
    }

}
