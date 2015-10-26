<?php

namespace XVEngine\Core\Handler;

use InvalidArgumentException;
use XVEngine\Core\Component\AbstractComponent;


/**
 * Class ActionHandler
 * @author Krzysztof Bordeux Bednarczyk
 * @package XVEngine\Bundle\CoreBundle\Handler
 */
class ActionHandler extends AbstractHandler
{

    /**
     *
     * @var string
     */
    public $name = "action";


    /**
     * Id of component
     * @var string
     */
    public $componentID;


    /**
     *
     * @var mixed[]
     */
    public $call = [];

    /**
     *
     * @var mixed[string]
     */
    public $options;


    /**
     * Set true to silence error in console when component is not found in DOM
     * @var bool
     */
    public $ignoreNotFound = false;


    /**
     * @param string|AbstractComponent $component
     */
    public function __construct($component)
    {
        if($component instanceof AbstractComponent){
            $component = $component->getID();
        }

        $this->setComponentID($component);
    }


    /**
     * Set component id or Protocol uri selector to component
     *
     * @author Krzysztof Bednarczyk
     * @param $id
     * @return $this
     */
    public function setComponentID($id)
    {
        $this->componentID = $id;
        return $this;
    }


    /**
     * Method register all method calls on this object and repeat it on component object in javascript
     *
     * @param string $name
     * @param mixed[] $arguments
     * @return ActionHandler
     * @throws InvalidArgumentException
     */
    public function __call($name, $arguments)
    {
        if (!is_string($name)) {
            throw new InvalidArgumentException('Function name must be a string!');
        }

        $this->call[] = array(
            "method" => $name,
            "arguments" => $arguments
        );

        return $this;
    }


    /**
     * Bind event on component
     *
     * @author Krzysztof Bednarczyk
     * @param string $eventName
     * @param callable|AbstractHandler $handler
     * @param null $obj
     * @return $this
     */
    public function on($eventName, $handler, $obj = null)
    {
        if(is_callable($handler)){
            $obj && $handler->bindTo($obj);
            $handler = $handler();
        }

        if(!($handler instanceof AbstractHandler)){
            throw new \InvalidArgumentException();
        }


        $this->call[] = array(
            "method" => "on",
            "arguments" => [
                $eventName,
                $handler
            ]
        );
        return $this;
    }


    /**
     * Set option to this handler
     *
     * @deprecated
     * @param string $key
     * @param mixed $value
     * @return $this
     */
    public function setOption($key, $value)
    {
        $this->options[$key] = $value;
        return $this;
    }


    /**
     * Get option to this handler
     *
     * @deprecated
     * @author Krzysztof Bednarczyk
     * @param $options
     * @return $this
     */
    public function setOptions($options)
    {
        $this->options = $options;
        return $this;
    }


    /**
     * @inheritdoc
     */
    public function jsonSerialize()
    {
        return array(
            "name" => $this->name,
            "call" => $this->call,
            "component" => $this->componentID,
            "options" => $this->options,
            "ignoreNotFound" => !!$this->ignoreNotFound
        );
    }


}
