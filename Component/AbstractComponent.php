<?php

namespace XVEngine\Core\Component;

use JsonSerializable;
use XVEngine\Core\Handler\AbstractHandler;


/**
 * Class AbstractComponent
 * @author Krzysztof Bordeux Bednarczyk
 * @package XVEngine\Bundle\CoreBundle\Component
 */
abstract class AbstractComponent extends Events implements JsonSerializable {

    /**
     *
     * @var mixed[] 
     */
    public $params = array();

    /**
     *
     * @var int 
     */
    protected $id;

    /**
     * Component name
     * @var string 
     */
    protected $componentName = "";

    
    /**
     * Events list
     * @var AbstractHandler[]
     */
    public $eventHandlers = [];

    /**
     *
     * @var mixed[] 
     */
    public $attrs = [];


    /**
     * @param null|string $id
     */
    public function __construct($id = null) {
        $this->setId($id);
        $this->setParamByRef("attrs", $this->attrs);
        $this->initialize();
    }





    /**
     * Get id value
     * @author Krzysztof Bednarczyk
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set id value
     * @author Krzysztof Bednarczyk
     * @param int $id
     * @return  $this
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Get componentName value
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public function getComponentName()
    {
        return $this->componentName;
    }

    /**
     * Set componentName value
     * @author Krzysztof Bednarczyk
     * @param string $componentName
     * @return  $this
     */
    protected function setComponentName($componentName)
    {
        $this->componentName = $componentName;
        return $this;
    }




    /**
     * @deprecated
     */
    public function getPath(){
        return $this->getSelector();
    }


    /**
     * @author Krzysztof Bednarczyk
     * @return string
     */
    public function getSelector(){
        return "component://{$this->getId()}";
    }


    /**
     * @author Krzysztof Bednarczyk
     * @return \mixed[]
     */
    protected function getParams() {
        return $this->params;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param $key
     * @return mixed|null
     */
    protected function getParam($key) {
        if (!isset($this->params[$key])) {
            return null;
        }
        return $this->params[$key];
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param $key
     * @param $value
     * @return $this
     */
    protected function setParam($key, $value) {
        $this->params[$key] = $value;
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param $key
     * @param $value
     * @return $this
     */
    protected function setParamByRef($key, &$value) {
        $this->params[$key] = &$value;
        return $this;
    }





    /**
     * 
     */
    abstract protected function initialize();



    /**
     * Add HTML class to current component
     * @author Krzysztof Bednarczyk
     * @param $classes
     * @return $this
     */
    public function addClass($classes){
        if(is_array($classes)){
            $classes = implode(" " , $classes);
        }
        
        $classeExsist = $this->getParam('classes');
        if(!$classeExsist){
            $classeExsist = "";
        }
        $classes = $classeExsist.' '.$classes;
        $this->setParam('classes', $classes);
        return $this;
    }

    /**
     * Change HTML attribute of component
     * @param string $key
     * @param string $value
     * @return $this
     */
    public function setAttr($key, $value){
        $this->attrs[$key] = $value;
        return $this;
    }


    /**
     * @author Krzysztof Bednarczyk
     * @param string $key
     * @return mixed|null
     */
    public function getAttr($key){
        if(isset($this->attrs[$key])){
            return $this->attrs[$key];
        }

        return null;
    }


    /**
     * Serialize current component to array
     * @author Krzysztof Bednarczyk
     * @return array
     */
    public function jsonSerialize() {
        return array(
            "id" => $this->getID(),
            "component" => $this->getComponentName(),
            "params" => $this->getParams(),
            "events" => $this->getEvents()
        );
    }
    
 


}
