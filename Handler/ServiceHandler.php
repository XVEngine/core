<?php

namespace XVEngine\Core\Handler;



/**
 * Class ServiceHandler
 * @author Krzysztof Bordeux Bednarczyk
 * @package XVEngine\Bundle\CoreBundle\Handler
 */
class ServiceHandler extends AbstractHandler {

    /**
     * 
     * @var string
     */
    public $name = "service";

    
    /**
     *
     * Service name
     * @var string
     */
    public $serviceName;


    
    /**
     *
     * @var mixed[]
     */
    protected $calls = [];


    /**
     *
     * @param string $serviceName Selector to service ex. "progress.ui"
     */
    public function __construct($serviceName) {
        $this->serviceName = $serviceName;
    }
    
    
    /**
     * This function register call on this object and repeat this calls on object in JavaScript
     *
     * @param string $name
     * @param mixed[] $arguments
     * @return ServiceHandler
     */
    public function __call($name, $arguments) {
        $this->calls[] = array(
            "method"  => $name,
            "arguments" => $arguments
        );
        return $this;
    }


    /**
     * Bind logic to event
     *
     * @param string $eventName
     * @param callable $callable
     * @param null|Object $obj
     * @return $this
     */
    public function on($eventName, callable $callable, $obj = null){

        if($obj){
            $callable->bindTo($obj);
        }


        $handler = null;
        $this->calls[] = array(
            "method"  => "on",
            "arguments" => [$eventName, $callable()]
        );

        return $this;
    }


    /**
     * @inheritdoc
     */
    public function jsonSerialize() {
        return array(
            "name" => $this->name,
            "serviceName" => $this->serviceName,
            'call' => $this->calls,
        );
    }

}
